import array
import gc
from micropython import const

SAMPLE_COUNT = const(32 * 24)
Vdd0 = const(3.3)
Ta0 = const(25)

Resolution_correction = const(1)
emissivity = const(1)


class MLX90640:
    def __init__(self, i2c, addr=51):
        self.i2c = i2c
        self.addr = addr
        self.in_buf = bytearray(SAMPLE_COUNT * 2)
        self.out_buf = bytearray(SAMPLE_COUNT * 2)
        self.Vdd = self._get_Vdd()
        self.Ta = self._get_Ta()
        self.Kgain = self._get_Kgain()
        self.offsets = self._get_offsets()
        gc.collect()
        self.Kta = self._get_Kta()
        gc.collect()
        self.Kv = self._get_Kv()
        self.CPcompensation = self._get_CPcompensation()
        self._read_cp(init=True)
        self.TGC = self._get_TGC()
        self.Acomp = self._get_Acomp()
        gc.collect()
        self.Ksto2 = self._get_Ksto2()
        self.Tar = self._get_Tar()
        gc.collect()

    def _read_reg16(self, reg):
        buf = self.i2c.readfrom_mem(self.addr, reg, 2, addrsize=16)
        return buf

    def _get_Vdd(self):
        b = self._read_reg16(0x2433)
        Kvdd = b[0]
        if Kvdd > 127:
            Kvdd -= 256
        Kvdd <<= 5
        Vdd25 = ((b[1] - 256) << 5) - 8192

        b = self._read_reg16(0x072A)
        VDDpix = b[0] << 8 | b[1]
        if VDDpix > 32767:
            VDDpix -= 65536
        return (Resolution_correction * VDDpix - Vdd25) / Kvdd + Vdd0

    def _get_Ta(self):
        b = self._read_reg16(0x2432)
        Kvptat = b[0] >> 2
        if Kvptat > 31:
            Kvptat -= 64
        Kvptat /= 4096
        Ktptat = (b[0] & 0x03) << 8 | b[1]
        if Ktptat > 511:
            Ktptat -= 1024
        Ktptat /= 8

        dV = self.Vdd - Vdd0
        b = self._read_reg16(0x2431)
        Vptat25 = b[0] << 8 | b[1]
        if Vptat25 > 32767:
            Vptat25 -= 65536

        b = self._read_reg16(0x0720)
        Vptat = b[0] << 8 | b[1]
        if Vptat > 32767:
            Vptat -= 65536

        b = self._read_reg16(0x0700)
        Vbe = b[0] << 8 | b[1]
        if Vbe > 32767:
            Vbe -= 65536

        b = self._read_reg16(0x2410)
        ALPHAptat_ee = (b[0] & 0xF0) >> 4
        ALPHAptat = (ALPHAptat_ee >> 2) + 8

        Vptat_art = (Vptat << 18) / (Vptat * ALPHAptat + Vbe)

        return (Vptat_art / (1 + Kvptat * dV) - Vptat25) / Ktptat + Ta0

    def _get_Kgain(self):
        b = self._read_reg16(0x2430)
        Gain = b[0] << 8 | b[1]
        if Gain > 32767:
            Gain -= 65536

        b = self._read_reg16(0x070A)
        denom = b[0] << 8 | b[1]
        if denom > 32767:
            denom -= 65536

        return Gain / denom

    def _get_offsets(self):
        b = self._read_reg16(0x2411)
        Offsetavg = b[0] << 8 | b[1]
        if Offsetavg > 32767:
            Offsetavg -= 65536

        b = self._read_reg16(0x2410)
        OCCscalerow = b[0] & 0x0F
        OCCscalecol = b[1] >> 4
        OCCscaleremnant = b[1] & 0x0F

        OCCrow = []
        for i in range(6):
            b = self._read_reg16(0x2412 + i)
            occ = b[1] & 0x0F
            if occ > 7:
                occ -= 16
            occ <<= OCCscalerow
            OCCrow.append(occ)
            occ = b[1] >> 4
            if occ > 7:
                occ -= 16
            occ <<= OCCscalerow
            OCCrow.append(occ)
            occ = b[0] & 0x0F
            if occ > 7:
                occ -= 16
            occ <<= OCCscalerow
            OCCrow.append(occ)
            occ = b[0] >> 4
            if occ > 7:
                occ -= 16
            occ <<= OCCscalerow
            OCCrow.append(occ)

        OCCcol = []
        for i in range(8):
            b = self._read_reg16(0x2418 + i)
            occ = b[1] & 0x0F
            if occ > 7:
                occ -= 16
            occ <<= OCCscalecol
            OCCcol.append(occ)
            occ = b[1] >> 4
            if occ > 7:
                occ -= 16
            occ <<= OCCscalecol
            OCCcol.append(occ)
            occ = b[0] & 0x0F
            if occ > 7:
                occ -= 16
            occ <<= OCCscalecol
            OCCcol.append(occ)
            occ = b[0] >> 4
            if occ > 7:
                occ -= 16
            occ <<= OCCscalecol
            OCCcol.append(occ)

        PIXosref = array.array('f')
        for r in range(24):
            for c in range(32):
                b = self._read_reg16(0x2440 + r * 32 + c)
                Offset = b[0] >> 2
                if Offset > 31:
                    Offset -= 64
                Offset <<= OCCscaleremnant
                PIXosref.append(Offsetavg + OCCrow[r] + OCCcol[c] + Offset)
        return PIXosref

    def _get_Kta(self):
        b = self._read_reg16(0x2436)
        oo = b[0]
        if oo > 127:
            oo -= 256
        eo = b[1]
        if eo > 127:
            eo -= 256
        b = self._read_reg16(0x2437)
        oe = b[0]
        if oe > 127:
            oe -= 256
        ee = b[1]
        if ee > 127:
            ee -= 256
        Ktaavg = [[oo, oe], [eo, ee]]

        b = self._read_reg16(0x2438)
        Ktascale1 = (b[1] >> 4) + 8
        Ktascale2 = b[1] & 0x0F
        denom = 2 ** Ktascale1

        Kta = array.array('f')
        for r in range(24):
            for c in range(32):
                b = self._read_reg16(0x2440 + r * 32 + c)
                Kta_ee = (b[1] & 0x0E) >> 1
                if Kta_ee > 3:
                    Kta_ee -= 8
                Kta.append((Ktaavg[r%2][c%2] + (Kta_ee << Ktascale2)) / denom)
        return Kta

    def _get_Kv(self):
        b = self._read_reg16(0x2438)
        Kvscale = b[0] & 0x0F
        denom = 2 ** Kvscale

        b = self._read_reg16(0x2434)
        oo = b[0] >> 4
        if oo > 7:
            oo -= 16
        eo = b[0] & 0x0F
        if eo > 7:
            eo -= 16
        oe = b[1] >> 4
        if oe > 7:
            oe -= 16
        ee = b[1] & 0x0F
        if ee > 7:
            ee -= 16
        return [[oo / denom, oe / denom], [eo / denom, ee / denom]]

    def _get_CPcompensation(self):
        b = self._read_reg16(0x243A)
        Off_CPsubpage0 = (b[0] & 0x03) << 8 | b[1]
        if Off_CPsubpage0 > 511:
            Off_CPsubpage0 -= 1024
        Off_CPsubpage1delta = b[0] >> 2
        if Off_CPsubpage1delta > 31:
            Off_CPsubpage1delta -= 64
        Off_CPsubpage1 = Off_CPsubpage0 + Off_CPsubpage1delta

        b = self._read_reg16(0x2438)
        Ktascale1 = (b[1] >> 4) + 8
        Kvscale = b[0] & 0x0F

        b = self._read_reg16(0x243B)
        Ktacp_ee = b[1]
        if Ktacp_ee > 127:
            Ktacp_ee -= 256
        Kvcp_ee = b[0]
        if Kvcp_ee > 127:
            Kvcp_ee -= 256

        Kta_cp = Ktacp_ee / (2 ** Ktascale1)
        Kv_cp = Kvcp_ee / (2 ** Kvscale)

        multiplier = (1 + Kta_cp * (self.Ta - Ta0)) * (1 + Kv_cp * (self.Vdd - Vdd0))
        CPcompensation0 = Off_CPsubpage0 * multiplier
        CPcompensation1 = Off_CPsubpage1 * multiplier

        return CPcompensation0, CPcompensation1

    def _get_TGC(self):
        b = self._read_reg16(0x243C)
        TGCee = b[1]
        if TGCee > 127:
            TGCee -= 256
        return TGCee / 32

    def _get_Acomp(self):
        b = self._read_reg16(0x2420)
        Ascale_cp = ((b[0] & 0xF0) >> 4) + 27

        b = self._read_reg16(0x2439)
        Acp_subpage_0 = ((b[0] & 0x03) << 8 | b[1]) / (2 ** Ascale_cp)

        CP_P1_P0ratio = (b[0] & 0xFC) >> 2
        if CP_P1_P0ratio > 31:
            CP_P1_P0ratio -= 64

        Acp_subpage_1 = Acp_subpage_0 * (1 + CP_P1_P0ratio / 128)

        b = self._read_reg16(0x243C)
        Ksta_ee = b[0]
        if Ksta_ee > 127:
            Ksta_ee -= 256

        Ksta = Ksta_ee / 8192

        b = self._read_reg16(0x2421)
        Areference = b[0] << 8 | b[1]

        b = self._read_reg16(0x2420)
        Ascale = (b[0] >> 4) + 30
        ACCscalerow = b[0] & 0x0F
        ACCscalecol = b[1] >> 4
        ACCscaleremnant = b[1] & 0x0F

        ACCrow = []
        for i in range(6):
            b = self._read_reg16(0x2422 + i)
            acc = b[1] & 0x0F
            if acc > 7:
                acc -= 16
            acc <<= ACCscalerow
            ACCrow.append(acc)
            acc = b[1] >> 4
            if acc > 7:
                acc -= 16
            acc <<= ACCscalerow
            ACCrow.append(acc)
            acc = b[0] & 0x0F
            if acc > 7:
                acc -= 16
            acc <<= ACCscalerow
            ACCrow.append(acc)
            acc = b[0] >> 4
            if acc > 7:
                acc -= 16
            acc <<= ACCscalerow
            ACCrow.append(acc)

        ACCcol = []
        for i in range(8):
            b = self._read_reg16(0x2428 + i)
            acc = b[1] & 0x0F
            if acc > 7:
                acc -= 16
            acc <<= ACCscalecol
            ACCcol.append(acc)
            acc = b[1] >> 4
            if acc > 7:
                acc -= 16
            acc <<= ACCscalecol
            ACCcol.append(acc)
            acc = b[0] & 0x0F
            if acc > 7:
                acc -= 16
            acc <<= ACCscalecol
            ACCcol.append(acc)
            acc = b[0] >> 4
            if acc > 7:
                acc -= 16
            acc <<= ACCscalecol
            ACCcol.append(acc)

        denom = 2 ** Ascale
        Acomp = array.array('f')
        for r in range(24):
            for c in range(32):
                i = r * 32 + c
                b = self._read_reg16(0x2440 + i)
                Apixel = ((b[0] & 0x03) << 4) | (b[1] >> 4)
                if Apixel > 31:
                    Apixel -= 64
                Apixel <<= ACCscaleremnant
                A = (Areference + ACCrow[r] + ACCcol[c] + Apixel) / denom

                if i % 2:
                    Acomp.append((A - self.TGC * Acp_subpage_1) * (1 + Ksta * (self.Ta - Ta0)))
                else:
                    Acomp.append((A - self.TGC * Acp_subpage_0) * (1 + Ksta * (self.Ta - Ta0)))
        return Acomp

    def _get_Ksto2(self):
        b = self._read_reg16(0x243D)
        Ksto2_ee = b[0]
        if Ksto2_ee > 127:
            Ksto2_ee -= 256

        b = self._read_reg16(0x243F)
        Kstoscale = (b[1] & 0x0F) + 8

        return Ksto2_ee / 2 ** Kstoscale

    def _get_Tar(self):
        Tak4 = (self.Ta + 273.15) ** 4
        Tr = self.Ta - 8
        Trk4 = (Tr + 273.15) ** 4

        return Trk4 - (Trk4 - Tak4) / emissivity

    def _read_cp(self, init=False):
        b = self._read_reg16(0x0708)
        PIXgain_cp_sp0 = b[0] << 8 | b[1]
        if PIXgain_cp_sp0 > 32767:
            PIXgain_cp_sp0 -= 65536
        PIXgain_cp_sp0 *= self.Kgain

        b = self._read_reg16(0x0728)
        PIXgain_cp_sp1 = b[0] << 8 | b[1]
        if PIXgain_cp_sp1 > 32767:
            PIXgain_cp_sp1 -= 65536
        PIXgain_cp_sp1 *= self.Kgain

        if init:
            self.PIXgain_cp_sp0 = PIXgain_cp_sp0
            self.PIXgain_cp_sp1 = PIXgain_cp_sp1
        else:
            self.PIXgain_cp_sp0 = 0.8 * self.PIXgain_cp_sp0 + 0.2 * PIXgain_cp_sp0
            self.PIXgain_cp_sp1 = 0.8 * self.PIXgain_cp_sp1 + 0.2 * PIXgain_cp_sp1

        PIXos_cp_sp0 = self.PIXgain_cp_sp0 - self.CPcompensation[0]
        PIXos_cp_sp1 = self.PIXgain_cp_sp1 - self.CPcompensation[1]

        return PIXos_cp_sp0, PIXos_cp_sp1

    def read(self):
        in_buf = self.in_buf
        out_buf = self.out_buf
        Kgain = self.Kgain
        offsets = self.offsets
        Kta = self.Kta
        Kv = self.Kv
        Ksto2 = self.Ksto2
        Acomp = self.Acomp
        Tar = self.Tar

        PIXos_cp_sp0, PIXos_cp_sp1 = self._read_cp()
        PIXos_cp_sp0 *= self.TGC
        PIXos_cp_sp1 *= self.TGC

        dT = self.Ta - Ta0
        dV = self.Vdd - Vdd0

        self.i2c.readfrom_mem_into(self.addr, 0x0400, in_buf, addrsize=16)
        for r in range(24):
            for c in range(32):
                i = r * 32 + c
                raw = in_buf[i*2] << 8 | in_buf[i*2 + 1]
                if raw > 32767:
                    raw -= 65536

                # Gain compensation
                out = raw * Kgain

                # IR data compensation: offset, Vdd, Ta
                out = out - offsets[i] * (1 + Kta[i] * dT) * (1 + Kv[r%2][c%2] * dV)

                # IR data Emissivity compensation
                out = out / emissivity

                # IR data gradient compensation
                if i % 2:
                    out = out - PIXos_cp_sp1
                else:
                    out = out - PIXos_cp_sp0

                # Normalizing to sensitivity and Calculating To for basic temperature range
                Sx = Ksto2 * (Acomp[i] ** 3 * out + Acomp[i] ** 4 * Tar) ** 0.25
                out = (out / (Acomp[i] * (1 - Ksto2 * 273.15) + Sx) + Tar) ** 0.25 - 273.15

                # Convert to int with x10 multiplier
                out = int(out * 10)
                if out < 0:
                    out += 65536
                out_buf[i*2] = out >> 8
                out_buf[i*2 + 1] = out & 0xFF

    def get_buf(self):
        return self.out_buf

    def get_temperature(self, x, y):
        if 0 <= x < 32 and 0 <= y < 24:
            i = y * 32 + x
            return (self.out_buf[i*2] << 8 | self.out_buf[i*2 + 1]) / 10.0
        else:
            raise ValueError('Coordinates out of range')