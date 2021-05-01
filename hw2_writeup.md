# Assignment 2 Write Up

## Initial Questions
- What does the distribution of Pokémon base stats look like?
- Are any Pokémon types more common than others? 
- How do the sizes of Pokémon correlate with their strength?

## Analysis
After making visualizations to answer my initial questions, I wanted to further explore the patterns I saw in these graphs.
 To do this, I first made charts showing HP and Speed stat distributions across all Pokémon to see if these stats’ distributions mirrored the total base stat distribution trend. Then I graphed the median base stat total for Pokémon separated by their primary type to see if any types were generally stronger or weaker than others. After making the graph that shows the frequency of Pokémon by type, I decided to pick a type from this graph and see how its frequency changed between each new generation of Pokémon games. I took a subset of the original data to make an array that only included information on Pokémon with Fire as their primary type to make this visualization. I made the choice early on to only consider the primary type of all Pokémon when using type as a variable to simplify the data analysis. 

## Lessons Learned
I learned that asking for help is usually the fastest way to get unstuck from a problem! I spent a significant amount of time reading documentation, looking up examples, and watching videos to try to solve the issues I was having with my code. When I went to Kevin’s office hours, I was able to solve my problems in a fraction of the time I had spent trying solutions on my own. I also got firsthand experience seeing the trade-offs between making a visualization easy to understand and representing the data as accurately as possible. Presenting every possible type combination would have made my visualizations too visually busy to quickly derive insights from. This also would have confused people who are not familiar with the mechanics of Pokémon games. I chose to only consider a Pokémon’s first type for my analyses to avoid this, but it also resulted in the visualizations only representing a partially accurate summary of the data. For example, my visualization that depicts the frequency of Pokémon species by type shows that Water types are the most common. In reality, more than half of all Water types have a secondary type. If I were to count every Pokémon for both their primary and secondary typing, there may not have been as big of a difference between Water types’ frequency and the frequency of rarer types like Fairy and Flying. 
