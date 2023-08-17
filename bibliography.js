document.addEventListener('DOMContentLoaded', function (e) {

    // Define the style of bibliography.
    // [1] ...
    // [2] ...
    d3.select('head')
        .append('style')
        .html('#bibliography ol li {list-style:none}'
            + '#bibliography ol {counter-reset:list; padding:0; margin:0}'
            + '#bibliography ol > li {display:table; counter-increment:list; margin-bottom: 0.6em;}'
            + '#bibliography ol > li:before {content:"[" counter(list,decimal) "] "; display:table-cell; padding-right: .6em}');

    // Define the style of anchors.
    // ...^[1]
    const format_anchor = (contents) => {
        return '<sup>[' + contents + ']</sup>'
    };

    const placeholder = d3.select('#bibliography');
    const list = placeholder.html('').append('ol');

    // Find bibliography.
    const bib_items = {};
    d3.selectAll('[id^=bib-]')
        .each(function () {
            const tag = this.id.slice(4);
            const str = this.innerHTML.replace(/<\/?[^>]+(>|$)/g, '')  // HTMLタグを削除
                .replace(/\s+/g, ' ')            // 複数の空白を単一の空白に置き換え
                .trim();                         // 文字列の先頭と末尾の空白を削除
            bib_items[tag] = str;
        }).remove();

    // Find citing positions and insert successive numbers there.
    const index = {};
    let count = 0;
    d3.selectAll('[class^=cite-]')
        .each(function () {
            const tag = this.classList[0].slice(5);

            if (!index[tag]) {
                index[tag] = ++count;
                list.append('li')
                    .attr('id', 'bib-' + tag)
                    .html(bib_items[tag]);
            }

            this.outerHTML = format_anchor(`<a href="#bib-${tag}" title="${bib_items[tag]}">${index[tag]}</a>`);
        });
});
