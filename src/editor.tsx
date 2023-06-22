/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import { BlockEditProps } from "wordpress__blocks";

import EditorsHelper from "../lib/ReactEditor";
/**
 * Create the Edit Mode rendering of the Reactable Synthethics Chatbox Custom BLock Type
 * @param props - saved as hard-coded string like attributes used for both editing and rendering.
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 *
 */



export function Edit(
  props: BlockEditProps<{
    title?: string;
    blockId?: string;
  }>
) {
  const React = window.React;



  const { attributes, setAttributes } = props;
  if (!attributes.blockId || attributes.blockId !== props.clientId) {
    setAttributes({ blockId: props.clientId });
  }
  const blockProps = useBlockProps({
    className: "wp-block-liulock-trending",
  });
  const innerBlockProps = useBlockProps({
    className: "wp-block-liulock-trending",
  });
  return (
    <div {...blockProps}>
      <RichText 
        tagName="h3"
        value={attributes.title || "Trending Posts Commentary"}
        onChange={(value) => {
          setAttributes({ title: value });
        }}
      />
      <InnerBlocks />
  <div className="loop-list-1" id='loop-list-1'>
    <EditorsHelper/>
  </div>

<script type="module" ></script>
<script></script>
  {/*Loop list 2*/}

    </div>
  );
}
