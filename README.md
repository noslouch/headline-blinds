# Ventian Blind Text Reveal

## Exposing Multi-Line Headers with a Waterfall Reveal

### For use with a CMS of your choosing

Let's say you have a quote you want to reveal in a fancy way. This repo should give you that way.

The markup structure is pretty straightforward. A header tag, `h1 - h6` wraps a series of `.rows`. Inside each `.row`, you'll find a `.blind` and a `span`. The `span` holds a line of text and the `.blind` acts as our mask.

Like so:

    <h1>
        <div class="row">
            <div class="blind"></div>
            <span>We've come too far</span>
        </div>
        <div class="row">
            <div class="blind"></div>
            <span>To give up who we are</span>
        </div>
        <div class="row">
            <div class="blind"></div>
            <span>So let's raise the bar</span>
        </div>
        <div class="row">
            <div class="blind"></div>
            <span>And our cups to the stars</span>
        </div>
        <div class="row">
            <div class="blind"></div>
            <span>- Pharrell Williams</span>
        </div>
    </h1>

## TODOS

* Stagger animation to produce "waterfall" effect
* Add downward direction to reveal effect
* Test with slideshow plugin
