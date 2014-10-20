---
layout: post
title: Sublime Text 3 jump to definition/method

excerpt: Quick blog post to show you how to easily add the feature goto or jump to definition on Sublime text 3 with custom shortcut.
---

Quick blog post to show you how to easily add the feature goto or jump to definition on Sublime text 3 with custom shortcut

<div class="fluidImg">
    <img src="/assets/images/post-images/st3-goto-definition.gif" alt="Sublime Text 3 jump to definition/method">
</div>

## Simple steps

In Sublime Text 3
<pre><code data-language="HTML">
Sublime Text -> Preferences -> Key Bindings - User
</code></pre>

You can add any shortcut you want since it's not in use already so you don't overwrite the default shortcut settings.
<br>
In my case I decided to use "shift+command+m"..as below.

<pre><code data-language="Javascript">
[
    { "keys": ["shift+command+m"], "command": "goto_definition" }
]
</code></pre>

Save it and you are done. (ps: if did not work restart your Sublime Text 3).

Thanks.