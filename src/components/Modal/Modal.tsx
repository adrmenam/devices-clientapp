import React, {ReactNode} from "react";
import "./Modal.css"

interface IModalProps {
    title: string
    children: ReactNode
    footer: ReactNode
    show: boolean,
    onClose: () => void
}


export const Modal: React.FC<IModalProps> = ({
    title,
    children,
    footer,
    show,
    onClose
}) => {
    if(!show){
        return null;
    }
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {footer}
                    <button className="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}