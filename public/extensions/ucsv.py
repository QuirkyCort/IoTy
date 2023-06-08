def to_csv(data):
    row = ''
    try:
        for f in data:
            if isinstance(f, int) or isinstance(f, float):
                row += str(f) + ','
            elif isinstance(f, str):
                row += '"' + f.replace('"', '""') + '",'
        row = row[:-1]
    except:
        pass

    return row

def from_csv(data):
    row = split_fields(data)
    for i in range(len(row)):
        row[i] = process_field(row[i])
    return row

def split_fields(data):
    row = []
    field = ''
    quote = False
    try:
        for c in data:
            if c == '"':
                quote = not quote
                field += c
            elif c == ',' and not quote:
                row.append(field)
                field = ''
            else:
                field += c
        row.append(field)
    except:
        pass

    return row

def process_field(field):
    try:
        return int(field)
    except:
        pass
    try:
        return float(field)
    except:
        pass

    if field[0] == '"' and field[-1] == '"':
        return field[1:-1].replace('""', '"')
    else:
        return field

class reader:
    def __init__(self, filename):
        self.file = open(filename, 'r')

    def __iter__(self):
        return self

    def __next__(self):
        record = ''
        quote = False

        while True:
            c = self.file.read(1)
            if c == '"':
                quote = not quote
                record += c
            elif c == '\n' and not quote:
                return from_csv(record)
            elif c == '':
                if record == '':
                    raise StopIteration
                else:
                    return from_csv(record)
            else:
                record += c

    def close(self):
        self.file.close()

class writer:
    def __init__(self, filename, append=False):
        if append:
            self.file = open(filename, 'a')
        else:
            self.file = open(filename, 'w')

    def writerow(self, row):
        self.file.write(to_csv(row) + '\r\n')

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)

    def flush(self):
        self.file.flush()

    def close(self):
        self.file.close()