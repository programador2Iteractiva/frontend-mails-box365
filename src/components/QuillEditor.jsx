import React, { useEffect, useRef } from 'react';

const QuillEditor = ({ value, onChange, onFocus, onBlur }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current && window.Quill) {
            // Inicializa la instancia de Quill en el div
            quillInstance.current = new window.Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link'],
                        ['clean'],
                        ['image', 'code-block']
                    ],
                },
            });

            // Sincroniza el contenido inicial
            if (value) {
                quillInstance.current.root.innerHTML = value;
            }
            
            // Escucha los cambios del usuario y actualiza el estado de React
            quillInstance.current.on('text-change', (delta, oldDelta, source) => {
                if (source === 'user') {
                    onChange(quillInstance.current.root.innerHTML);
                }
            });
        }
    }, [onChange, value]);
    
    // Asegura que el editor se enfoca cuando el contenedor recibe el foco
    const handleFocus = () => {
        onFocus();
        quillInstance.current.focus();
    };

    return (
        <div onFocus={handleFocus} onBlur={onBlur} tabIndex={0}>
             <div ref={editorRef} />
        </div>
    );
};

export default QuillEditor;