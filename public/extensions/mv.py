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

            if thresholds[0] < buf[pos] < thresholds[1] and thresholds[2] < buf[pos+1] < thresholds[3] and thresholds[4] < buf[pos+3] < thresholds[5]:
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

            if thresholds[0] < buf[pos] < thresholds[1]:
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