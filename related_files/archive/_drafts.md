# Saved drafts — snippets for future use

## Frost epigraph
Candidate for a future hiking / outdoors page.

### HTML
```html
<!-- Frost epigraph — requires IM Fell English font (see below) -->
<div class="outreach-epigraph">
    <p>Two roads diverged in a wood, and I &mdash;<br>
    I took the one less travelled by,<br>
    and that has made all the difference.</p>
    <span class="epigraph-attrib">&mdash; Robert Frost, <em>The Road Not Taken</em>, 1916</span>
</div>
```

### Font imports (add to page <head>)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@1&display=swap" rel="stylesheet">
```

### CSS (already in style.css — .outreach-epigraph, .outreach-epigraph p, .outreach-epigraph .epigraph-attrib)
No changes needed to style.css; the classes are already defined.
