<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Website architecture
- Use shared presentation components and the TanStack root shell for navigation, footer and enquiry context, so every page stays consistent.
- Keep official contact configuration and enquiry URL generation in one browser-safe module, so missing contact information never creates unintended external links.
- Keep the preview catalogue in a typed standalone dataset with explicit demo and checkout-eligibility fields, so approved commerce integrations can replace it without changing cards.
