# Lolalytics Extrap Override
## The 3 item set tabs on Lolalytics and their issues
This section explains what the 3 tabs on Lolalytics do, as well as the motivation for this project. If you don't want to read I have also made a video about it:
https://www.youtube.com/watch?v=c1J5obgYNeo

Lolalytics has 3 item set tabs:
- The Exact Item Count only includes the games where the players had exactly those items when the game ended, no more, no fewer;
- The Actually Built Sets is open by default and it includes the games where the players had those items or more when the game ended. This is also the standard format for datasets across most other stat sites;
- The Extrapolated Sets tab includes the games where players ended the game with exactly those items, but also an estimation of the games where players ended with fewer items than those, but which would have gone for those items if given the chance;

While this is more information than other sites provide, neither of the 3 tabs is adequate if you want to see the stats of everyone that went for the builds shown. To get that you have to add the Extrapolated Sets to the Actually built Sets and subtract the Exact Item Counts (the Exact Item Counts are included in the other tabs, so you have to subtract to avoid double-counting them).

Besides that, sorting sets by winrate, as is done in the Extrapolated Sets tab runs into issues when the game counts are low, which is why Lolalytics excluudes all builds with under 100 games in it. A more robust way to address this issue is to estimate a winrate that we can be sure is lower than the actual winrate the build would have with more games and then sort by that winrate. The code in this repo uses the [Wilson score interval with continuity correction](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval_with_continuity_correction) to estimate winrates that have a 99% chance to be lower than the build's actual winrate.

## Solution
The code in this repo changes the Extrapolated Sets tab to show the stats of all the games where people went for the builds (as described in the previous section). It also changes the winrates of that tab such that there is approximately a 99% chance of the winrate shown being lower than what the build would get if it had infinite games.

## Setup
In order to perform the override you need to use an extension called [Resource Override](https://github.com/kylepaulsen/ResourceOverride), which works with Firefox and Chrome.

First you need to open any champion page on lolalytics. 
On it press right-click and then Inspect, then open the Debugger tab if you're on Firefox or the Sources tab if you're on Chrome.    
Then navigate to lolalytics.com > static > js > 548.90b09f85.chunk.js (this filename changes whenever lolalytics is updated, but so far it has always started with 548, so if you don't find this exact filename then see if there's another that starts with 548)
Select the text editor and press ctrl-a to select all the code and copy it.   

Open the Resource Override extension and go to Options > Load Rules and select lolalytics_extrap_override_rules.json (that you can download from this repo).

After you've copied the code go back to the Resource Override extension, press Edit File, and paste the code then press Beautify JS.    
Then press Find and search for 
`} else {`     
(there should only be one in the entire file, at the time of writing it's on line 3048, but updates may change this)

Delete everything in the curly brackets after the else (which should be lines 3049-3074) and paste all the code in override.js (from this repo) inside those curly brackets.

After saving and exiting you should be done. 

You can verify the instalation by checking the Extrapolated Sets on any champion with the devtools (the Inspect sidebar) open. If everything is working correctly then the phrase "Lolalytics Extrap Override is installed" should be printed in the console.

### Whenever there is a significant change to lolalytics you'll need to redo these steps if you want to see the change.
