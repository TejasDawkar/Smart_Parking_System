
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./pass.css"; // Import CSS file
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import {QRCodeCanvas} from 'qrcode.react';

const Pass = () => {
    const [rate, setRate] = useState({});
    const vehicle = localStorage?.getItem('Vehicle') || "";
    const userData = JSON.parse(localStorage?.getItem('User'));
    const [price, setPrice] = useState(0);
    const [pdfUrl, setPdfUrl] = useState("");
    console.log(pdfUrl, 'PDFURL');
    const passRef = useRef();
    let isPassGenerated = true;

    const createPass = () => {
        console.log("Pass generated for:", vehicle, "Price:", price);
        isPassGenerated = true;
    };

    const passPrices = async () => {
        try {
            const rates = await axios.get('http://localhost:5000/users/pass');
            setRate(rates?.data[0]?.[vehicle] || {});
        } catch (error) {
            console.log('Error', error);
        }
    };

    // const downloadPDF = () => {
    //     const passElement = passRef.current;
    //     html2canvas(passElement, { scale: 2 }).then(canvas => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
    //         pdf.save(`${vehicle}_pass.pdf`);
    //     });
    // };
    const uploadPDF = async (pdfBlob) => {
        const formData = new FormData();
        formData.append("pdf", pdfBlob, "vehicle_pass.pdf");
    
        try {
            const response = await axios.post("http://localhost:5000/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { fileUrl } = response.data;

            // Set QR code to use the public URL instead of a blob
            setPdfUrl(fileUrl);
            console.log("File uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    const downloadPDF = () => {
        const passElement = passRef.current;
        html2canvas(passElement, {scale: 2}).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(image, "PNG", 10, 10, 190, 100);
            const pdfBlob = pdf.output("blob");
            uploadPDF(pdfBlob);

            // Create URL for local download
            // const pdfBlobURL = URL.createObjectURL(pdfBlob);
            // localStorage.setItem("pdfUrl", pdfBlobURL);
            // setPdfUrl(pdfBlobURL);

            // Trigger download
            pdf.save("vehicle_pass.pdf");
        })
    }

    useEffect(() => {
        passPrices();
    }, []);

    return (
        <>
        {!isPassGenerated &&
        <div className="pass-container">
            <h2>{vehicle} Pass</h2>
            <div className="pass-options">
                <button onClick={() => setPrice(rate?.Monthly)}>Monthly</button>
                <button onClick={() => setPrice(rate?.Quarterly)}>Quarterly</button>
                <button onClick={() => setPrice(rate?.Yearly)}>Yearly</button>
            </div>
            <input className="price-input" name="Price" value={price} disabled />
            <button className="generate-btn" onClick={createPass}>Generate Pass</button>
        </div>}
        {isPassGenerated && 
            <div className="pass-container generated-pass" ref={passRef}>
                <h2>{vehicle} Pass</h2>
                <div className="pass-details">
                    <span>Name:</span> <span>{userData?.user_name}</span> <br/>
                    {/* <span>Mobile:</span> <span>{userData?.user_mobile}</span> <br/> */}
                    {/* <span>Role:</span> <span>{userData?.user_role}</span> <br/> */}
                    <span>Vehicle No.:</span> <span>{userData?.vehicle_no}</span> <br/>
                    <span>Type:</span> <span>{userData?.vehicle_type}</span> <br/>
                    <span>Pass Duration:</span> <span>{userData?.vehicle_type}</span> 
                </div>
                <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
            </div>
        }
        {pdfUrl &&
        <div>
            <QRCodeCanvas value={pdfUrl} size={150} />
        </div>
        }
    </>
    );
};

export default Pass;







// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import "./pass.css"; // Import CSS file
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { QRCodeCanvas } from 'qrcode.react';

// const Pass = () => {
//     const [rate, setRate] = useState({});
//     const vehicle = localStorage?.getItem('Vehicle') || "";
//     const userData = JSON.parse(localStorage?.getItem('User'));
//     const [price, setPrice] = useState(0);
//     const [pdfUrl, setPdfUrl] = useState(localStorage.getItem("pdfUrl") || "");
//     const [isPassGenerated, setIsPassGenerated] = useState(!!pdfUrl); // Use state instead of let variable
//     const passRef = useRef();

//     const passPrices = async () => {
//         try {
//             const rates = await axios.get('http://localhost:5000/users/pass');
//             setRate(rates?.data[0]?.[vehicle] || {});
//         } catch (error) {
//             console.log('Error', error);
//         }
//     };

//     const generatePDF = async () => {
//         const passElement = passRef.current;
//         html2canvas(passElement, { scale: 2 }).then((canvas) => {
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
//             const pdfBlob = pdf.output("blob");

//             // Create a URL for the generated PDF
//             const pdfFileUrl = URL.createObjectURL(pdfBlob);
//             setPdfUrl(pdfFileUrl);
//             localStorage.setItem("pdfUrl", pdfFileUrl); // Store in localStorage

//             console.log("PDF Generated:", pdfFileUrl);
//         });
//     };

//     const createPass = async () => {
//         console.log("Pass generated for:", vehicle, "Price:", price);
//         setIsPassGenerated(true);
//         // Wait for the next render cycle to access passRef
//         setTimeout(() => {
//             if (passRef.current) {
//                 generatePDF();
//             } else {
//                 console.error("Error: Pass element not found.");
//             }
//         }, 500); // Short delay to ensure DOM is updated
//     };

//     const downloadPDF = () => {
//         if (!pdfUrl) return;
//         const link = document.createElement("a");
//         link.href = pdfUrl;
//         link.download = `${vehicle}_pass.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     useEffect(() => {
//         passPrices();
//     }, []);

//     return (
//         <div className="pass-container">
//             {!isPassGenerated ? (
//                 <>
//                     <h2>{vehicle} Pass</h2>
//                     <div className="pass-options">
//                         <button onClick={() => setPrice(rate?.Monthly)}>Monthly</button>
//                         <button onClick={() => setPrice(rate?.Quarterly)}>Quarterly</button>
//                         <button onClick={() => setPrice(rate?.Yearly)}>Yearly</button>
//                     </div>
//                     <input className="price-input" name="Price" value={price} disabled />
//                     <button className="generate-btn" onClick={createPass}>Generate Pass</button>
//                 </>
//             ) : (
//                 <div className="generated-pass" ref={passRef}>
//                     <h2>{vehicle} Pass</h2>
//                     <div className="pass-details">
//                         <span>Name:</span> <span>{userData?.user_name}</span> <br/>
//                         <span>Mobile:</span> <span>{userData?.user_mobile}</span> <br/>
//                         <span>Role:</span> <span>{userData?.user_role}</span> <br/>
//                         <span>Vehicle No.:</span> <span>{userData?.vehicle_no}</span> <br/>
//                         <span>Vehicle Type:</span> <span>{userData?.vehicle_type}</span> <br/>
//                         <span>Pass Duration:</span> <span>{userData?.vehicle_type}</span> 
//                     </div>
//                     <button className="download-btn" onClick={downloadPDF}>Download PDF</button>

//                     {/* QR Code for downloading the pass */}
//                     <div className="qr-code">
//                         <h3>Scan QR to Download</h3>
//                         {pdfUrl ? (
//                             <QRCodeCanvas value={pdfUrl} size={150} />
//                         ) : (
//                             <p>Generating QR Code...</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Pass;

