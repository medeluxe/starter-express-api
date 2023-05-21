export function doc({ from, heading, content }) {
    const defaults = {
        learnMore: "https://medluxe-smtp.glitch.me",
    };
    return `
         <div
            style="
                margin: auto auto;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            "
        >
            <div
                style="
                    overflow: hidden;
                    --ml-primary-Color:rgb(25, 91, 178);
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 2em;
                    border-radius: 1em;
                    background-color: white;
                    box-shadow: 0 0 10px 1px rgba(0, 0, 0.3);
                "
            >
                <h1
                    style="
                        text-align: center;
                        font-weight: bolder;
                        font-size: 30px;
                        max-width: 35ch;
                        margin: 0 auto;
                        padding-bottom: 1em;
                        color: var(--ml-primary-Color);
                    "
                >
                    ${heading}
                </h1>
                <p style="width: 100%; max-width: 70ch; margin: 0 auto; padding-top:1.5em">
                   ${content}
                </p>

                <div style="margin-top: 2em; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; width:100%; max-width: 70ch; gap:1.5em;" >
                    <div class="">
                        <b style="font-weight:400">FROM:</b>
                        <p
                            style="
                            margin: 0;
                            padding: 2px 0;
                            font-weight: 700;
                            letter-spacing: 1px;
                        "
                        >
                            Medluxe Mailer
                        </p>
                        <p style="margin: 0; padding: 0; font-size: small">
                            <a target="blank" href="${defaults.learnMore}" style="text-decoration: none; border-bottom: 1px solid; padding-bottom: 1px; color: var(--ml-primary-Color);"
                                >Learn more</a
                            >
                        </p>
                    </div>
                    ${from &&
        `
                        <div class="">
                            <b style="font-weight:600">By:</b>
                            <p
                                style="
                                margin: 0;
                                padding: 2px 0;
                                font-weight: small;
                                letter-spacing: 1px;
                                color: var(--ml-primary-Color);
                            "
                            >
                                <a target="blank" href="mailto://${from}" style="text-decoration: none; border-bottom: 1px solid; padding-bottom: 1px; color: var(--ml-primary-Color);"
                                    >${from}</a
                                >
                            </p>
                         
                        </div>
                        `}
                </div>
                </div>
            </div>
        </div>

    `;
}
