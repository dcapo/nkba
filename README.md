# North Korean Basketball Scoring

This package recomputes the scores of NBA games according to the North Korean rules of basketball. Why, you ask? Because they're *ridiculous*.

## Rules

* Slam dunks are worth three points.
* Distance shots taken from beyond the arc that do not touch the rim are worth four points. <sup>[1](#footnote1)</sup>
* One point is deducted for a missed free throw. 
* Shots made in the final three seconds of the game are worth eight points. <sup>[2](#footnote2)</sup>
* Games can end in a tie.

[Source](http://deadspin.com/5988085/north-korea-invented-its-own-totally-different-way-of-scoring-basketball-games)

### Footnotes

1. <a name="footnote1"></a>Unfortunately, no API today records swishes as a metric. I'm forced to leave this out of the analysis for now. Come on, people! This is important.
2. <a name="footnote2"></a>It's unclear how to score a swish made from behind the arc in the final three seconds of the game. Here, I assume the buzzer-beater rule supercedes the other rules, and we just count it as a totally reasonable eight points.

## Up next

How to score [North Korean golf](https://www.thestar.com/sports/golf/2011/12/19/kim_jongil_once_carded_38under_par_at_pyongyang_golf_course.html).
