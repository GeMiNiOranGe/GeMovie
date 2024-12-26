## Functional usecase
> Attention: Use case diagrams are not supported in Mermaid, check this [issue](https://github.com/mermaid-js/mermaid/issues/4628). I have implemented a `flowchart` instead. I will update the diagram if Mermaid supports it.

```mermaid
flowchart LR
    %%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%

    actor1["`«actor»<br/>**User**`"]

    subgraph GeMovie
        uc1([1.Login])
        uc2([2.Register])
        uc3([3.Personal account management])
        uc4([4.View detailed content])
        uc5([5.Movie review])
        uc6([6.Search content])
        uc7([7.View popular movie])
        uc8([8.View genre list])
        uc9([9.Remove movie from favorites list])
    end

    actor1 --> uc1
    actor1 --> uc2
    actor1 --> uc3
    actor1 --> uc6
    actor1 --> uc7
    actor1 --> uc8
    actor1 --> uc9

    uc2 -->|«extend»| uc1
    uc3 -->|«include»| uc1
    uc9 -->|«include»| uc1
    uc5 -->|«include»| uc1
    uc5 -->|«extend»| uc4
    uc4 -->|«extend»| uc6
    uc4 -->|«extend»| uc7
```
