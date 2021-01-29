/* Footnote Generator (yashichi@twitter)
 * The tagged texts given 'footnote' class are transformed into '<sup>&dagger;#</sup>' (# is replaced with an incremental number),
 * and their contents are organized together in the placeholder given 'footnote' id.
 */
document.addEventListener('DOMContentLoaded', function(e) {

    d3.select('head')
        .append('style')
        .html('#footnote div {'
              +'margin-bottom: 0.6em;'
              +'margin-left: 1em; text-indent: -1em;'
              +'}');

    const placeholder = d3.select('#footnote').html('');

    let count = 0;
    d3.selectAll('[class=footnote]')
        .html(function(d) {
            ++count;
            placeholder
                .append('div')
                .attr('id', 'fn-content-'+count)
                .html('<sup><a href="#fn-anchor-'+count+'">&dagger;'+count+'</a> </sup>'+this.innerHTML);

            return '<sup><a id="fn-anchor-'+count+'" href="#fn-content-'+count+'" title="'+this.innerText+'">&dagger;'+count+'</a></sup>'
        });
});
