import { useEffect, useRef, useState } from "react";
import {
    diffSourcePlugin,
    markdownShortcutPlugin,
    AdmonitionDirectiveDescriptor,
    DirectiveDescriptor,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    SandpackConfig,
    codeBlockPlugin,
    codeMirrorPlugin,
    sandpackPlugin,
    KitchenSinkToolbar,
    MDXEditor,
    MDXEditorMethods
} from '@mdxeditor/editor'


import '@mdxeditor/editor/style.css'
import Markdown from "react-markdown";

interface InlineEditProps {
    value: string;

    onChange: (newValue: string) => void;
}

const ALL_PLUGINS = [
    toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
        imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300')
    }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' } }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
    markdownShortcutPlugin()
]

const InlineMarkDownEdit: React.FC<InlineEditProps> = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const mdxEditorRef = useRef<MDXEditorMethods>(null)

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (md: string) => {
        setCurrentValue(md);
        onChange(md)
        console.log(md)
    };

    const handleClick = () => {
        console.log('Click')
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing) {
            if (inputRef.current) {
                inputRef.current.focus()
            }
            console.log(isEditing)
        }
    }, [isEditing])


    useEffect(() => {
        setCurrentValue(value)
        mdxEditorRef?.current?.setMarkdown(value)
        console.log('set ', value)
    }, [value])


    return (
        <div className="text-left">
            <article
                onClick={handleClick}
                className="prose"
            >
                {/* {(!value && !isEditing) ? (
                <span className="text-gray-400">What to do?</span>

            ) : isEditing ? (
                <textarea
                    ref={inputRef}
                    value={currentValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What to do?"
                    className="inline-edit__input flex justify-start"
                />
            ) : (
                result
            )} */}
                <MDXEditor
                    ref={mdxEditorRef}
                    markdown={currentValue} plugins={ALL_PLUGINS}
                    onChange={handleChange}
                    placeholder='Write something'
                />
            </article>
        </div>
    );
};

export default InlineMarkDownEdit;