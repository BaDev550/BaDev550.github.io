# BaDev550.github.io

Personal portfolio for BaDev: the Tourqe engine, games and graphics work.

Plain HTML, CSS and JavaScript. There is no build step.

## Edit the content

Everything lives in `data/portfolio.js`:

- Add the `url` of any project link and its button appears. Leave it empty and it stays hidden.
- Fill in `steam`, `itch` and `email` to show them in the contact section.
- Add a new object to `projects` to add a card.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Push to the `main` branch of `BaDev550/BaDev550.github.io`. In the repo settings, under Pages, set the source to "Deploy from a branch" with `main` and `/ (root)`. The site goes live at https://badev550.github.io.
