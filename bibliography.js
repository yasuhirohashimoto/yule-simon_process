document.addEventListener('DOMContentLoaded', function(e) {

    // Define the style of bibliography.
    // [1] ...
    // [2] ...
    d3.select('head')
        .append('style')
        .html('#bibliography ol li {list-style:none}'
              +'#bibliography ol {counter-reset:list; padding:0; margin:0}'
              +'#bibliography ol > li {display:table; counter-increment:list; margin-bottom: 0.6em;}'
              +'#bibliography ol > li:before {content:"[" counter(list,decimal) "] "; display:table-cell; padding-right: .6em}');

    // Define the style of anchors.
    // ...^[1]
    const format_anchor = (contents) => {
        return '<sup>['+contents+']</sup>'
    };

    const placeholder = d3.select('#bibliography');
    const list = placeholder.html('').append('ol');

    // Find bibliography.
    const bib_items = {};
    d3.selectAll('[id^=bib-]')
        .each(function() {
            const tag = this.id.substr(4);
            let str = this.innerHTML.replace(/\r?\n|\r/g, ' ');
            str = str.replace(/\s+/g, ' ');
            str = str.replace(/^\s/g, '');
            bib_items[tag] = str;
        }).remove();

    // Find citing positions and insert successive numbers there.
    const index = {};
    let count = 0;
    d3.selectAll('[class^=cite-]')
        .each(function() {
            const tag = this.classList[0].substr(5);
            let j = index[tag];
            if (j===undefined) {
                j = index[tag] = ++count;
                // Append the cited item to the bibliography placeholder.
                list.append('li')
                    .attr('id', 'bib-'+tag)
                    .html(bib_items[tag]);
                
            }
            this.outerHTML = format_anchor('<a href="#bib-'+tag+'" title="'+bib_items[tag]+'">'+j+'</a>');
        });
});
