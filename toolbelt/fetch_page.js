const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require('fs');


// or
// import {NotionToMarkdown} from "notion-to-md";

const PAGE_TITLE = 'Toolbelt';
const PAGE_ID = 'a5bfca8f04cb44d0949bc615be8849de';
const notion = new Client({
  auth: 'secret_DuuAMolppeA7ct4pLZKjg9HZ7yJgI24c9oEV1jtMYWp',
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const mdblocks = await n2m.pageToMarkdown(PAGE_ID);
  const mdString = n2m.toMarkdownString(mdblocks);

  //writing to file
  fs.writeFile(`${PAGE_TITLE}.md`, mdString, (err) => {
    console.log(err);
  });
})();
