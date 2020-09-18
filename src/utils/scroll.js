import BScroll from 'better-scroll'
/**
 *
 * @param {*} wrapper
 */
export const handleScrollPage = function (wrapper, fade = true, interactive = false,  preventDefault = false, mouseWheel = true) {
    return  new BScroll(wrapper, {
        startY: 1,
        scrollbar: {
            fade: fade,
            interactive: interactive, // 1.8.0 新增
            preventDefault: preventDefault
        },
        mouseWheel: mouseWheel
    })
}
