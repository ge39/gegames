import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  '../styles/Globals.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Home() {
    const [files, setFiles] = useState([]);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [format, setFormat] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [dimensionDisplay, setDimensionDisplay] = useState("");
    const [validDimensions, setValidDimensions] = useState(true);
    const fileInputRef = useRef(null);
    const outputRef = useRef(null);
    
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        checkSelection(selectedFiles);
    };

    const handleDimensionChange = () => {
        checkSelection(files);
    };

    const checkSelection = (selectedFiles) => {
        const widthSelected = width !== "";
        const heightSelected = height !== "";
        const formatSelected = format !== "";
        const filesSelected = selectedFiles.length > 0;

        let validDimensions = true; // Remover a variável se não for necessária.
        if (filesSelected) {
            const file = selectedFiles[0];
            const img = new Image();
            const reader = new FileReader();
           
            reader.onload = (e) => {
                img.src = e.target.result;
                img.onload = () => {
                    const originalWidth = img.width;
                    const originalHeight = img.height;
                    setDimensionDisplay(`Dimensões da imagem original: ${originalWidth}x${originalHeight}px`);

                    if (originalWidth < width || originalHeight < height) {
                        setWarningMessage(`A imagem tem dimensões menores que as selecionadas (${originalWidth}x${originalHeight}px).`);
                        setValidDimensions(false);
                    } else {
                        setWarningMessage("");
                        setValidDimensions(true);
                    }
                };
            };
            reader.readAsDataURL(file);
        }

        if (widthSelected && heightSelected && formatSelected && filesSelected && validDimensions) {
            setWarningMessage("");
        }
    };

    const resizeAndDownload = () => {
        const zip = new JSZip();
        let processedCount = 0;

        files.forEach((file) => {
            resizeImage(file, (blob) => {
                const extension = format === "original" ? file.name.split('.').pop() : format.split('/')[1];
                const newFileName = file.name.replace(/\.[^/.]+$/, `.${extension}`);
                zip.file(newFileName, blob);

                const imgPreview = document.createElement('img');
                imgPreview.src = URL.createObjectURL(blob);
                outputRef.current.appendChild(imgPreview);

                processedCount++;
                checkCompletion(processedCount, files.length, zip);
            });
        });
    };

    const resizeImage = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    callback(blob);
                }, format || 'image/jpeg');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const checkCompletion = (processedCount, totalFiles, zip) => {
        if (processedCount === totalFiles) {
            zip.generateAsync({ type: 'blob' }).then((content) => {
                saveAs(content, 'imagens_redimensionadas.zip');
                setTimeout(() => {
                    outputRef.current.innerHTML = '';
                }, 16000);
            });
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#8409' }}>
                <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <h2>Reduzir e Baixar Imagens em Lote</h2>

                        <div style={{ backgroundColor: '#ecf0f1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3>1 - Selecione as imagens</h3>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div style={{ backgroundColor: '#ecf0f1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3>2 - Escolha as dimensões de saída</h3>
                            <div style={{padding:'10px',marginLeft:'0px'}}>
                                <label>Largura:</label>
                                <select value={width} onChange={(e) => setWidth(e.target.value)} onBlur={handleDimensionChange}>
                                    <option value="">Selecione</option>
                                    {Array.from({ length: 30 }, (_, i) => i * 50 + 50).map((value) => (
                                        <option key={value} value={value}>{value}px</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Altura:</label>
                                <select value={height} onChange={(e) => setHeight(e.target.value)} onBlur={handleDimensionChange}>
                                    <option value="">Selecione</option>
                                    {Array.from({ length: 30 }, (_, i) => i * 50 + 50).map((value) => (
                                        <option key={value} value={value}>{value}px</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#ecf0f1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3>3 - Escolha o formato de saída</h3>
                            <select value={format} onChange={(e) => setFormat(e.target.value)} onBlur={handleDimensionChange}>
                                <option value="original">Selecione um Formato</option>
                                <option value="image/jpeg">JPEG</option>
                                <option value="image/png">PNG</option>
                                <option value="image/webp">WebP</option>
                            </select>
                        </div>

                        <p style={{ color: 'red', fontSize: '14px' }}>{warningMessage}</p>
                        <p style={{ fontSize: '14px' }}>{dimensionDisplay}</p>

                        <button onClick={resizeAndDownload} disabled={!validDimensions} style={{ backgroundColor: '#3498db', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Redimensionar e Baixar
                        </button>
                    </div>
                    <div style={{ flex: 5, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <h3>Pré-visualização das imagens redimensionadas</h3>
                        <div ref={outputRef} style={{
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(5, 1fr)', // Definindo 5 colunas de igual largura
                            gap: '10px', // Espaçamento entre as imagens
                        }}></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
