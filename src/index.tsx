/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import { Edit } from "./editor";

import metadata from "./block.json";
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

registerBlockType<{
  title?: string;
  category?: string;
  blockId?: string;
}>(metadata.name, {
  attributes: {
    title: {
      type: "string",
      selector: "h3",
    },
    blockId: {
      type: "string",
    },
  },
  edit: Edit,
  save: (props) => {
    const React = window.React;

    const blockProps = useBlockProps.save({
      className: "wp-block-liulock-trending",
    });

    const innerBlockProps = useBlockProps.save({
      className: "wp-block-liulock-trending",
    });
    return (
      <div {...blockProps}>
        <RichText.Content tagName="h3" value={props.attributes.title ||
          "Trending Posts Commentary"
        } />
        <InnerBlocks.Content />
        <div className="loop-list-1" id="loop-list-1">
          </div>

          <script type='text/javascript'
           src='https://awsuni.com/wp-content/plugins/trending_posts_commentary/build/save.js'></script>
          <script>
            {`
            
            LiuSynthethicsTrendingPluginNuclearReactor();
            `}
          </script>
        </div>
    );
  },
  category: metadata.category,
  title: metadata.title,
});
