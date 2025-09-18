import {h} from 'vue'

export const paginatorTemplate = (props: any) => {
    /* 工具函数 */
    const btn = (label: string, click: Function, selected = false) =>
        h(
            'button',
            {
                onClick: click,
                class: ['quello-page-btn', {'quello-page-btn-active': selected}]
            },
            label
        )

    /* 上一页 */
    const prev = props.prevPageCallback
        ? h('div', {class: 'quello-nav'}, [btn('‹', props.prevPageCallback)])
        : null

    /* 下一页 */
    const next = props.nextPageCallback
        ? h('div', {class: 'quello-nav'}, [btn('›', props.nextPageCallback)])
        : null

    /* 页码 */
    const pages = h(
        'div',
        {class: 'quello-pages'},
        props.pages.map((p: any) =>
            btn(String(p.page), p.onClick, p.selected)
        )
    )

    /* 一整条分页栏 */
    return h('div', {class: 'quello-paginator'}, [prev, pages, next])
}