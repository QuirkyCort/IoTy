import math

def yuv_to_grayscale(buf):
    size = len(buf) / 2
    gray = bytearray(size)

    for i in range(size):
        gray[i] = buf[i * 2]

    return gray

def gaussian_blur_3x3_gray(buf, w, h):
    blurred = bytearray(w * h)

    for y in range(h):
        row = y * w
        row_m1 = y - 1
        row_p1 = y + 1
        if row_m1 < 0:
            row_m1 *= -1
        elif row_p1 > h - 1:
            row_p1 = 2 * h - row_p1 - 2
        row_m1 *= w
        row_p1 *= w
        for x in range(w):
            pos = row + x
            x_m1 = x-1
            x_p1 = x+1
            if x_m1 < 0:
                x_m1 *= -1
            elif x_p1 > w -1:
                x_p1 = 2 * w - x_p1 - 2
            pixel = 4 * buf[pos]
            pixel += 2 * (buf[row + x_m1] + buf[row + x_p1] + buf[row_m1 + x] + buf[row_p1 + x])
            pixel += buf[row_m1 + x_m1] + buf[row_m1 + x_p1] + buf[row_p1 + x_m1] + buf[row_p1 + x_p1]
            blurred[pos] = pixel // 16
    return blurred

def gaussian_blur_3x3_yuv(buf, w, h):
    blurred = bytearray(w * h * 2)

    for y in range(h):
        row = y * w * 2
        row_m1 = y - 1
        row_p1 = y + 1
        if row_m1 < 0:
            row_m1 *= -1
        elif row_p1 > h - 1:
            row_p1 = 2 * h - row_p1 - 2
        row_m1 *= w * 2
        row_p1 *= w * 2
        for x in range(w):
            x2 = x * 2
            pos = row + x2
            x_m1 = x-1
            x_p1 = x+1
            if x_m1 < 0:
                x_m1 *= -1
            elif x_p1 > w -1:
                x_p1 = 2 * w - x_p1 - 2
            x_m1 *= 2
            x_p1 *= 2
            pixel = 4 * buf[pos]
            pixel += 2 * (buf[row + x_m1] + buf[row + x_p1] + buf[row_m1 + x] + buf[row_p1 + x])
            pixel += buf[row_m1 + x_m1] + buf[row_m1 + x_p1] + buf[row_p1 + x_m1] + buf[row_p1 + x_p1]
            blurred[pos] = pixel // 16

    hw = w // 2
    for y in range(h):
        row = y * hw * 4
        row_m1 = y - 1
        row_p1 = y + 1
        if row_m1 < 0:
            row_m1 *= -1
        elif row_p1 > h - 1:
            row_p1 = 2 * h - row_p1 - 2
        row_m1 *= hw * 4
        row_p1 *= hw * 4
        for x in range(hw):
            x4 = x * 4
            pos = row + x4
            x_m1 = x-1
            x_p1 = x+1
            if x_m1 < 0:
                x_m1 *= -1
            elif x_p1 > w -1:
                x_p1 = 2 * w - x_p1 - 2
            x_m1 *= 4
            x_p1 *= 4
            u = 4 * buf[pos + 1]
            u += 2 * (buf[row + x_m1 + 1] + buf[row + x_p1 + 1] + buf[row_m1 + x + 1] + buf[row_p1 + x + 1])
            u += buf[row_m1 + x_m1 + 1] + buf[row_m1 + x_p1 + 1] + buf[row_p1 + x_m1 + 1] + buf[row_p1 + x_p1 + 1]
            blurred[pos + 1] = u // 16
            v = 4 * buf[pos + 3]
            v += 2 * (buf[row + x_m1 + 3] + buf[row + x_p1 + 3] + buf[row_m1 + x + 3] + buf[row_p1 + x + 3])
            v += buf[row_m1 + x_m1 + 3] + buf[row_m1 + x_p1 + 3] + buf[row_p1 + x_m1 + 3] + buf[row_p1 + x_p1 + 3]
            blurred[pos + 3] = v // 16
    return blurred

def sobel(buf, w, h):
    g = [0] * (w * h)
    for y in range(1, h-1):
        row = y * w
        for x in range(1, w-1):
            pos = row + x
            gx = buf[pos - 1] * -2
            gx += buf[pos + 1] * 2
            gx -= buf[pos - 1 - w]
            gx += buf[pos + 1 - w]
            gx -= buf[pos - 1 + w]
            gx += buf[pos + 1 + w]
            gy = buf[pos - w] * -2
            gy += buf[pos + w] * 2
            gy -= buf[pos - w - 1]
            gy += buf[pos + w - 1]
            gy -= buf[pos - w + 1]
            gy += buf[pos + w + 1]
            g[pos] = gx**2 + gy**2
    return g

def edge_detect(buf, w, h, minV, maxV):
    edge = bytearray(w * h)

    g = sobel(buf, w, h)
    for i in range(w * h):
        if g[i] > maxV:
            edge[i] = 255

    for y in range(1, h-1):
        row = y * w
        for x in range(1, w-1):
            pos = row + x
            if minV < g[pos] < maxV:
                if edge[pos - w] or edge[pos + w] or edge[pos - 1] or edge[pos + 1]:
                    edge[pos] = 255

    return edge

def hough_circles_single(buf, w, h, r, threshold):
    a_w = w - 2 * r
    a_h = h - 2 * r
    accum = [[0] * a_w for _ in range(a_h)]
    minR2 = math.ceil((r - 0.5) ** 2)
    maxR2 = math.floor((r + 0.5) ** 2)

    for y in range(h):
        row = y * w
        for x in range(w):
            if buf[row + x]:
                x_start = max(x - r, r)
                x_end = min(x + r, a_w + r)
                y_start = max(y - r, r)
                y_end = min(y + r, a_h + r)
                for a in range(y_start, y_end):
                    dy = (y - a) ** 2
                    for b in range(x_start, x_end):
                        a_r = (x - b)**2 + dy
                        if minR2 <= a_r <= maxR2:
                            accum[a-r][b-r] += 1

    results = []
    for a in range(a_h):
        for b in range(a_w):
            if accum[a][b] > threshold:
                results.append([b+r, a+r])

    merged_results = []
    for result in results:
        merged = False
        for merged_result in merged_results:
            if (merged_result[3]-1 <= result[0] <= merged_result[4]+1
                and merged_result[5]-1 <= result[1] <= merged_result[6]+1):
                merged_result[0] += 1
                merged_result[1] += result[0]
                merged_result[2] += result[1]
                merged_result[3] = min(result[0], merged_result[3])
                merged_result[4] = max(result[0], merged_result[4])
                merged_result[5] = min(result[1], merged_result[5])
                merged_result[6] = max(result[1], merged_result[6])
                merged = True
                break
        if merged == False:
            merged_results.append([1, result[0], result[1], result[0], result[0], result[1], result[1]])

    final_results = []
    for merged_result in merged_results:
        final_results.append([merged_result[0], merged_result[1] / merged_result[0], merged_result[2] / merged_result[0]])

    final_results.sort(key=lambda x: -x[0])
    return final_results

def _process_blobs(blobs, pixelsThreshold):
    keys = list(blobs.keys())
    keys.sort()
    for i in range(len(keys)-1, -1, -1):
        key = keys[i]
        for j in range(i-1, -1, -1):
            if key in blobs[keys[j]][0]:
                blobs[keys[j]][0].update(blobs[key][0])
                blobs[keys[j]][1] += blobs[key][1]
                blobs[keys[j]][2] += blobs[key][2]
                blobs[keys[j]][3] += blobs[key][3]
                blobs[keys[j]][4] = min(blobs[keys[j]][4], blobs[key][4])
                blobs[keys[j]][5] = max(blobs[keys[j]][5], blobs[key][5])
                blobs[keys[j]][6] = min(blobs[keys[j]][6], blobs[key][6])
                blobs[keys[j]][7] = max(blobs[keys[j]][7], blobs[key][7])
                del blobs[key]
                break

    results = []
    for k in blobs:
        blob = blobs[k]
        if blob[1] >= pixelsThreshold:
            results.append([
                blob[1],
                blob[2] / blob[1],
                blob[3] / blob[1],
                blob[4],
                blob[6],
                blob[5] - blob[4],
                blob[7] - blob[6]
            ])

    results.sort(key=lambda x: -x[0])
    return results

def find_blobs_yuv(buf, width, height, thresholds, pixelsThreshold):
    blobs = {}
    groupings = [[0] * (width // 2) for _ in range(height // 2)]
    next_group = 1
    for y in range(height // 2):
        row = y * 2 * width
        for x in range(width // 2):
            pos = (row + x * 2) * 2

            if thresholds[0] <= buf[pos] <= thresholds[1] and thresholds[2] <= buf[pos+1] <= thresholds[3] and thresholds[4] <= buf[pos+3] <= thresholds[5]:
                left = 0
                top = 0
                if x != 0:
                    left = groupings[y][x-1]
                if y != 0:
                    top = groupings[y-1][x]

                if left == 0 and top == 0:
                    groupings[y][x] = next_group
                    blobs[next_group] = [set([next_group]), 1, x, y, x, x, y, y]
                    next_group += 1
                elif left != 0:
                    groupings[y][x] = left
                    blobs[left][1] += 1
                    blobs[left][2] += x
                    blobs[left][3] += y
                    if x < blobs[left][4]:
                        blobs[left][4] = x
                    elif x > blobs[left][5]:
                        blobs[left][5] = x
                    if y < blobs[left][6]:
                        blobs[left][6] = y
                    elif y > blobs[left][7]:
                        blobs[left][7] = y

                    if top != 0:
                        if left > top:
                            blobs[top][0].add(left)
                        elif top > left:
                            blobs[left][0].add(top)
                elif top != 0:
                    groupings[y][x] = top
                    blobs[top][1] += 1
                    blobs[top][2] += x
                    blobs[top][3] += y
                    if x < blobs[top][4]:
                        blobs[top][4] = x
                    elif x > blobs[top][5]:
                        blobs[top][5] = x
                    if y < blobs[top][6]:
                        blobs[top][6] = y
                    elif y > blobs[top][7]:
                        blobs[top][7] = y

    return _process_blobs(blobs, pixelsThreshold)

def find_blobs_grayscale(buf, width, height, thresholds, pixelsThreshold):
    blobs = {}
    groupings = [[0] * width for _ in range(height)]
    next_group = 1
    for y in range(height):
        row = y * width
        for x in range(width):
            pos = row + x

            if thresholds[0] <= buf[pos] <= thresholds[1]:
                left = 0
                top = 0
                if x != 0:
                    left = groupings[y][x-1]
                if y != 0:
                    top = groupings[y-1][x]

                if left == 0 and top == 0:
                    groupings[y][x] = next_group
                    blobs[next_group] = [set([next_group]), 1, x, y, x, x, y, y]
                    next_group += 1
                elif left != 0:
                    groupings[y][x] = left
                    blobs[left][1] += 1
                    blobs[left][2] += x
                    blobs[left][3] += y
                    if x < blobs[left][4]:
                        blobs[left][4] = x
                    elif x > blobs[left][5]:
                        blobs[left][5] = x
                    if y < blobs[left][6]:
                        blobs[left][6] = y
                    elif y > blobs[left][7]:
                        blobs[left][7] = y

                    if top != 0:
                        if left > top:
                            blobs[top][0].add(left)
                        elif top > left:
                            blobs[left][0].add(top)
                elif top != 0:
                    groupings[y][x] = top
                    blobs[top][1] += 1
                    blobs[top][2] += x
                    blobs[top][3] += y
                    if x < blobs[top][4]:
                        blobs[top][4] = x
                    elif x > blobs[top][5]:
                        blobs[top][5] = x
                    if y < blobs[top][6]:
                        blobs[top][6] = y
                    elif y > blobs[top][7]:
                        blobs[top][7] = y

    return _process_blobs(blobs, pixelsThreshold)