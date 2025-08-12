import React, { useEffect, useRef } from 'react';

const QuillEditor = ({ value, onChange, onFocus }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        // Asegurarnos de que el editor se inicialice solo una vez
        if (editorRef.current && !quillInstance.current && window.Quill) {
            
            // --- INICIO DE LA CORRECCIÓN PARA CENTRAR IMÁGENES ---
            // Le decimos a Quill que use estilos en línea (style) para la alineación.
            // Esto es más robusto y afecta correctamente a los contenedores de las imágenes.
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

            // Sincroniza los cambios con el estado de React
            quillInstance.current.on('text-change', (delta, oldDelta, source) => {
                if (source === 'user') {
                    const currentHtml = quillInstance.current.root.innerHTML;
                    onChange(currentHtml);
                }
            });
        }
    }, [onChange]);

    // Actualiza el contenido del editor si el valor del estado cambia desde fuera
    useEffect(() => {
        if (quillInstance.current) {
            const editorHtml = quillInstance.current.root.innerHTML;
            if (value !== editorHtml) {
                // Guarda la posición del cursor antes de actualizar
                const selection = quillInstance.current.getSelection();
                quillInstance.current.root.innerHTML = value;
                // Restaura la posición del cursor si era posible
                if (selection) {
                    quillInstance.current.setSelection(selection);
                }
            }
        }
    }, [value]);

    return (
        <div onFocus={onFocus} tabIndex={0}>
             <div ref={editorRef} style={{ height: '350px' }} />
        </div>
    );
};

export default QuillEditor;