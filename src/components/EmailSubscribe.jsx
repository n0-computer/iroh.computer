import { Input } from "@/components/Input";
import { Heading } from "./Heading";

export function EmailSubscribe() {
  return (
    <div id="mc_embed_shell">
    <div id="mc_embed_signup">
      <form action="https://computer.us10.list-manage.com/subscribe/post?u=7ee5e42577ed134f89e28572b&amp;id=ca88c7595d&amp;f_id=007ec0e5f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
        <div id="mc_embed_signup_scroll">
            <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{ display: "none"}} />
                <div className="response" id="mce-success-response" style={{ display: "none"}} />
            </div>
            <div style={{ position: "absolute", left: -5000 }} aria-hidden="true">
                <input type="text" name="b_7ee5e42577ed134f89e28572b_ca88c7595d" tabIndex="-1" />
            </div>
            <div className="flex gap-5 my-4">
              <div>
                <Input type="email" name="EMAIL" id="mce-EMAIL" placeholder="you@email.com" required />
              </div>
              <div>
                <input type="submit" className="rounded-sm bg-zinc-900 py-1.5 px-3 text-white hover:bg-zinc-700 dark:bg-iroh-purple-400/10 dark:text-iroh-purple-400 dark:ring-1 dark:ring-inset dark:ring-iroh-purple-400/20 dark:hover:bg-iroh-purple-400/10 dark:hover:text-iroh-purple-300 dark:hover:ring-iroh-purple-300" name="subscribe" id="mc-embedded-subscribe" value="Subscribe" />
              </div>
            </div>
        </div>
      </form>
    </div>
    </div>
  )
}
