def textLarge(oled, text, x=0, y=0, scale=4):
    def draw(coords):
        for c in coords:
            oled.fill_rect(x+c[0]*scale, y+c[1]*scale, c[2]*scale, c[3]*scale, 1)

    def drawNeg():
        draw((
            (0, 4, 5, 1),
        ))
    def draw1():
        draw((
            (2, 1, 1, 7),
        ))
    def draw2():
        draw((
            (0, 1, 5, 1, 1),
            (4, 2, 1, 2, 1),
            (0, 4, 5, 1, 1),
            (0, 5, 1, 3, 1),
            (0, 7, 5, 1, 1)
        ))
    def draw3():
        draw((
            (0, 1, 4, 1, 1),
            (0, 4, 4, 1, 1),
            (0, 7, 4, 1, 1),
            (4, 1, 1, 7, 1)
        ))
    def draw4():
        draw((
            (0, 1, 1, 3, 1),
            (0, 4, 4, 1, 1),
            (4, 1, 1, 7, 1)
        ))
    def draw5():
        draw((
            (0, 1, 5, 1, 1),
            (0, 2, 1, 2, 1),
            (0, 4, 5, 1, 1),
            (4, 5, 1, 3, 1),
            (0, 7, 5, 1, 1)
        ))
    def draw6():
        draw((
            (0, 1, 5, 1, 1),
            (0, 2, 1, 2, 1),
            (0, 4, 5, 1, 1),
            (4, 5, 1, 3, 1),
            (0, 7, 5, 1, 1),
            (0, 5, 1, 3, 1)
        ))
    def draw7():
        draw((
            (0, 1, 4, 1, 1),
            (4, 1, 1, 7, 1)
        ))
    def draw8():
        draw((
            (1, 1, 3, 1, 1),
            (1, 4, 3, 1, 1),
            (1, 7, 3, 1, 1),
            (4, 1, 1, 7, 1),
            (0, 1, 1, 7, 1)
        ))
    def draw9():
        draw((
            (0, 1, 4, 1, 1),
            (0, 4, 4, 1, 1),
            (0, 2, 1, 2, 1),
            (4, 1, 1, 7, 1)
        ))
    def draw0():
        draw((
            (1, 1, 3, 1, 1),
            (1, 7, 3, 1, 1),
            (4, 1, 1, 7, 1),
            (0, 1, 1, 7, 1)
        ))

    start_x = x
    for c in text:
        if c == '-':
            drawNeg()
        elif c == '1':
            draw1()
        elif c == '2':
            draw2()
        elif c == '3':
            draw3()
        elif c == '4':
            draw4()
        elif c == '5':
            draw5()
        elif c == '6':
            draw6()
        elif c == '7':
            draw7()
        elif c == '8':
            draw8()
        elif c == '9':
            draw9()
        elif c == '0':
            draw0()
        elif c == '\n':
            y += 8*scale
            x = start_x
            continue
        x += 6*scale