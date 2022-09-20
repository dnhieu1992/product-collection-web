import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { UploadImages, UploadVideos } from '../../components/ui';

import './dialog.scss';

interface FormDialogProps {
    open: any
    handleClose: any
    data: any
    onChange: any
    handleFormSubmit: any
    onImagesChange: any
    onVideosChange: any
}

export default function FormDialog({
    open,
    handleClose,
    data,
    onChange,
    handleFormSubmit,
    onImagesChange,
    onVideosChange
}: FormDialogProps) {
    const {
        _id,
        reviewDate,
        link,
        shopName,
        productType1,
        productType2,
        price,
        reviewContent,
        reviewImages,
        orderId,
        shippingCode,
        totalPrice,
        isReceived,
        isReviewed,
        reasonNoReview,
        reviewer,
        customer
    } = data;

    const custumdate = reviewDate?.split('.');

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{_id ? "Update product" : "Create new product"}</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isReceived}
                                    onChange={e => onChange(e)}
                                    name="isReceived"
                                    id="isReceived"
                                    color="primary"
                                />
                            }
                            label="Đã nhận"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isReviewed}
                                    onChange={e => onChange(e)}
                                    name="isReviewed"
                                    id="isReviewed"
                                    color="primary"
                                />
                            }
                            label="Đã review"
                        />
                        <div className="row">
                            <div className="col-sm-6">
                                <TextField id="shopName" value={shopName} onChange={e => onChange(e)} placeholder="Nhập tên shop" label="Tên shop" margin="dense" fullWidth />
                                <TextField id="link" value={link} onChange={e => onChange(e)} placeholder="Nhập link sp" label="link" margin="dense" fullWidth />
                                <TextField
                                    id="reviewDate"
                                    type="datetime-local"
                                    onChange={e => onChange(e)}
                                    value={custumdate[0]}
                                    placeholder="Nhập ngày"
                                    label="Ngày"
                                
                                    margin="dense"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField id="productType1" value={productType1} onChange={e => onChange(e)} placeholder="Nhập phân loại 1" label="Phân loại 1" margin="dense" fullWidth />
                                <TextField id="productType2" value={productType2} onChange={e => onChange(e)} placeholder="Nhập phân loại 2" label="Phân loại 2" margin="dense" fullWidth />
                                <TextField id="price" value={price} onChange={e => onChange(e)} placeholder="Nhập giá sp" label="Giá" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="reviewContent" value={reviewContent} onChange={e => onChange(e)} placeholder="Nhập nội dung review" label="Nội dung review" margin="dense" fullWidth />
                                {/* <TextField id="reviewImages" value={reviewImages} onChange={e => onChange(e)} placeholder="Nhập hình ảnh review" label="Hình ảnh review" margin="dense" fullWidth /> */}
                                <TextField id="orderId" value={orderId} onChange={e => onChange(e)} placeholder="Nhập mã đặt đơn" label="Mã đặt đơn" margin="dense" fullWidth />
                                <TextField id="shippingCode" value={shippingCode} onChange={e => onChange(e)} placeholder="Nhập mã vận đơn" label="Mã vận đơn" margin="dense" fullWidth />
                                <TextField id="totalPrice" value={totalPrice} onChange={e => onChange(e)} placeholder="Nhập số tiền đơn hàng" label="Số tiền đơn hàng" margin="dense" fullWidth />
                                <TextField id="reviewer" value={reviewer} onChange={e => onChange(e)} placeholder="Nhập tài khoản" label="Tải khoản" margin="dense" fullWidth />
                                <TextField id="customer" value={customer} onChange={e => onChange(e)} placeholder="Nhập khách" label="Khách" margin="dense" fullWidth />
                            </div>
                        </div>                                                                  
                        <TextField id="reasonNoReview" value={reasonNoReview} onChange={e => onChange(e)} multiline minRows={3} placeholder="Nhập lý do không review" label="Lý do không review" margin="dense" fullWidth />                       
                        <div className='form-group mt-3'>
                            <div>Upload Images</div>
                            <UploadImages onChange={onImagesChange} />
                        </div>
                        <div className='form-group'>
                            <label>Upload Videos</label>
                            <UploadVideos onChange={onVideosChange} />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={() => handleFormSubmit()} color="primary" variant="contained">
                        {_id ? "Update" : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};