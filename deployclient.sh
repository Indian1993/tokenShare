rsync -r src/ docs/
rsync -r build/contracts/* docs/
git add.
git commit -m "For github pages"
git push -u orign master
