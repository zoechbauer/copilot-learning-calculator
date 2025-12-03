# How to Update a Feature Branch with Main

> **Important:**  
> Keeping your feature branch (FB) up to date with `main` is **your responsibility**—this applies to every feature branch, including those created and worked on by GitHub Copilot Agent.  
> Copilot Agent does **not** automatically check for or merge updates from `main` into your FB.  
> Always follow the steps below to manually update your branch and avoid integration issues.

## Why Update Your Feature Branch?

- To incorporate the latest bug fixes, features, or refactoring from `main`
- To resolve merge conflicts early
- To ensure your branch is compatible with the current codebase before merging

## Step-by-Step Instructions

### 1. Switch to Your Feature Branch

```bash
git checkout your-feature-branch
# Example:
git checkout copilot/add-missing-unit-tests
```

### 2. Fetch the Latest Changes from Remote

```bash
git fetch origin
```

### 3. Merge or Rebase Main into Your Feature Branch

#### Option A: Merge

```bash
git merge origin/main
```
- This creates a merge commit if there are changes.

#### Option B: Rebase (Optional)

```bash
git rebase origin/main
```
- This rewrites your branch history to apply your changes on top of the latest `main`.

### 4. Resolve Any Merge Conflicts

- If conflicts occur, edit the files to resolve them.
- After resolving, continue with:
  ```bash
  git add <conflicted-files>
  git merge --continue   # for merge
  git rebase --continue  # for rebase
  ```

### 5. Push the Updated Feature Branch

```bash
git push origin your-feature-branch
```

## Example Workflow

```bash
git checkout copilot/add-missing-unit-tests
git fetch origin
git merge origin/main
# or: git rebase origin/main
git push origin copilot/add-missing-unit-tests
```

## Notes

- Use merge for a simple update; use rebase for a cleaner history (if your team prefers).
- Always run your tests after updating to ensure compatibility.

---

_Last updated: December 3, 2025_