import React, { useEffect, useRef } from 'react';

const QuillEditor = ({ value, onChange, onFocus }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current && window.Quill) {
            
            // --- INICIO DE LA CORRECCIÓN PARA CENTRAR IMÁGENES ---
            // Le decimos a Quill que use estilos en línea (style="text-align:center") para la alineación.
            // Esto permite que el centrado se aplique a los contenedores de las imágenes.
            const AlignStyle = window.Quill.import('attributors/style/align');
            window.Quill.register(AlignStyle, true);
            // --- FIN DE LA CORRECCIÓN ---

            quillInstance.current = new window.Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'align': [] }], // Opción para alinear (izquierda, centro, derecha)
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link', 'image', 'code-block'],
                        ['clean']
                    ],
                },
            });

            quillInstance.current.on('text-change', (delta, oldDelta, source) => {
                if (source === 'user') {
                    const currentHtml = quillInstance.current.root.innerHTML;
                    onChange(currentHtml);
                }
            });
        }
    }, [onChange]);

    useEffect(() => {
        if (quillInstance.current) {
            const editorHtml = quillInstance.current.root.innerHTML;
            if (value !== editorHtml) {
                quillInstance.current.root.innerHTML = value;
            }
        }
    }, [value]);

    return (
        <div onFocus={onFocus} tabIndex={0}>
             <div ref={editorRef} />
        </div>
    );
};

export default QuillEditor;