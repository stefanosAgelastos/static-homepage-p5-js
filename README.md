<MainGrid>

<HeaderTitle>
  
# Custom homepage <br/> made with P5.js and jQuery

<TitleAction href="https://github.com/stefanosAgelastos/static-homepage-p5-js" label="Go to github repo" />
<TitleAction href="https://www.stefworks.ml/static-homepage-p5-js/" label="Go to demo" />
</HeaderTitle>


<InfoGrid>

<InfoPaper>
  
## Description

This is my first portfolio homepage. I coded this project on a train from Stockholm to Copenhagen. It has three different sections, providing information about my projects, selfies of myself to show something more personal, and also my work experience so far.

</InfoPaper>

<InfoPaper>
<MyChip label="HTML"/>
<MyChip label="W3.css"/>
<MyChip label="jQuery"/>
<MyChip label="p5.js"/>
</InfoPaper>

</InfoGrid>

<PanelGrid>
<Panel id="1" heading="What?" secondaryHeading="About the technologies I used" >

### The Stack:
- HTML
- W3.css, is a pure CSS framework with built-in responsiveness
- jQUery
- p5.js, a JS client-side library for creating graphic and interactive experiences

</Panel>

<Panel id="2" heading="What not?" secondaryHeading="Things that don't work well" >

### The pitfalls

- There is a lot of media, so it loads slowly
- Maybe the most important problem is that I cannot share individual links that point to specific projects or subpages. Deep-linking

The app is statically served from github pages, and in order for me to implement individual subpages I would have to do a huge hack. That's the reason why I coded my [current portfolio webpage](https://www.stefworks.ml) with Next.js, which provides server-side rendering and static exporting.

</Panel>

<Panel id="3" heading="What now?" secondaryHeading="Future plans" >

### Implement as a React component

The most valuable feature of this project is the custom made nav bar. In my future plans, I would like to implement it as a React component, that can be used as a black box by other projects.
</Panel>

</PanelGrid>


</MainGrid>
