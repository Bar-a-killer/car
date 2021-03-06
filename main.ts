function 擺頭 () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . . . . .
        `)
    basic.pause(1)
    for (let index = 0; index < 200; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 10)
            basic.pause(1)
        } else {
            return 2
        }
    }
    mooncar.MoonCarGo(mooncar.Direction.direct4, 90)
    basic.pause(550)
    for (let index = 0; index < 200; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 10)
            basic.pause(1)
        } else {
            return 2
        }
    }
    return 0
}
function 循線 () {
    basic.showLeds(`
        . # . # .
        . . . . .
        # # . # #
        . . # . .
        . . . . .
        `)
    basic.pause(1)
    if (mooncar.LineFollowerSensor() == 全感光) {
        mooncar.MoonCarGo(mooncar.Direction.direct1, 15)
        basic.pause(1)
    } else if (mooncar.LineFollowerSensor() == 左感光) {
        mooncar.MoonCarGo(mooncar.Direction.direct3, 6)
        basic.pause(1)
    } else if (mooncar.LineFollowerSensor() == 右感光) {
        mooncar.MoonCarGo(mooncar.Direction.direct4, 6)
        basic.pause(1)
    }
}
function 超音波觸發 () {
    basic.showLeds(`
        . # # # .
        . . # . .
        # . . . #
        # # . # #
        # # # # #
        `)
    basic.pause(1)
    if (supersound / 2 % 2 == 1) {
        mooncar.MoonCarGo(mooncar.Direction.direct4, 15)
        basic.pause(500)
        mooncar.MoonCarLR(20, 90)
        basic.pause(4000)
        mooncar.MoonCarGo(mooncar.Direction.direct4, 15)
        basic.pause(500)
        return
    } else {
        mooncar.MoonCarGo(mooncar.Direction.direct3, 15)
        basic.pause(500)
        mooncar.MoonCarLR(90, 20)
        basic.pause(4000)
        mooncar.MoonCarGo(mooncar.Direction.direct3, 15)
        basic.pause(500)
        return
    }
}
function Mosquito_coil () {
    basic.showLeds(`
        . . # . .
        . # . # .
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(1)
    蚊香 = -90
    while (mooncar.LineFollowerSensor() == 無感光) {
        mooncar.MoonCarLR(90, 蚊香)
        basic.pause(100)
        if (蚊香 == -89.95) {
            蚊香 = 0
        } else {
            蚊香 += 0.05
        }
    }
}
function 無黑線 () {
    basic.showLeds(`
        # . . . #
        . . . . .
        # . . . #
        # . . . #
        . # # # .
        `)
    basic.pause(1)
    if (擺頭() == 2) {
        return
    }
    for (let index = 0; index < 500; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct1, 10)
            basic.pause(1)
        } else {
            return
        }
    }
    for (let index = 0; index < 175; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 20)
            basic.pause(1)
        } else {
            return
        }
    }
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    mooncar.MoonCarGo(mooncar.Direction.direct3, 90)
    basic.pause(400)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    for (let index = 0; index < 150; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 20)
            basic.pause(1)
        } else {
            return
        }
    }
    mooncar.MoonCarGo(mooncar.Direction.direct2, 100)
    basic.pause(1000)
    for (let index = 0; index < 175; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 20)
            basic.pause(1)
        } else {
            return
        }
    }
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    mooncar.MoonCarGo(mooncar.Direction.direct3, 90)
    basic.pause(400)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    for (let index = 0; index < 175; index++) {
        if (mooncar.LineFollowerSensor() == 無感光) {
            mooncar.MoonCarGo(mooncar.Direction.direct3, 20)
            basic.pause(1)
        } else {
            return
        }
    }
    Mosquito_coil()
}
let strip: neopixel.Strip = null
let 蚊香 = 0
let supersound = 0
let 全感光 = 0
let 左感光 = 0
let 右感光 = 0
let 無感光 = 0
mooncar.Filllight(mooncar.Switch.Open)
無感光 = 3
右感光 = 2
左感光 = 1
全感光 = 0
supersound = 1
蚊香 = 0
strip = neopixel.create(DigitalPin.P12, 8, NeoPixelMode.RGB)
basic.forever(function () {
    while (supersound % 2 == 1) {
        if (mooncar.UltrasonicSensor() < 15) {
            超音波觸發()
        } else if (mooncar.LineFollowerSensor() != 無感光) {
            循線()
        } else {
            mooncar.MoonCarGo(mooncar.Direction.direct5, 100)
            basic.pause(50)
            無黑線()
            mooncar.MoonCarGo(mooncar.Direction.direct5, 100)
            basic.pause(50)
        }
    }
})
