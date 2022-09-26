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
    user: any
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
    user,
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
        customer,
        keyWord
    } = data;

    const custumdate = reviewDate == null ? "" : reviewDate?.split('.');

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{_id ? "Update product" : "Create new product"}</DialogTitle>
                <DialogContent>
                    <form>
                        {
                            !user?.isCustomer && (
                                <>
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
                                </>
                            )
                        }
                        <div className='row'>
                            <div className="col-sm-6">
                                <TextField id="shopName" value={shopName} onChange={e => onChange(e)} placeholder="Nhập tên shop" label="Tên shop" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="link" value={link} onChange={e => onChange(e)} placeholder="Nhập link sp" label="link" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
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
                            </div>
                            <div className="col-sm-6">
                                <TextField id="keyWord" value={keyWord} onChange={e => onChange(e)} placeholder="Nhập keyword" label="keyword" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="productType1" value={productType1} onChange={e => onChange(e)} placeholder="Nhập phân loại 1" label="Phân loại 1" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="productType2" value={productType2} onChange={e => onChange(e)} placeholder="Nhập phân loại 2" label="Phân loại 2" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="price" value={price} onChange={e => onChange(e)} placeholder="Nhập giá sp" label="Giá" margin="dense" fullWidth />
                            </div>
                            {
                                !user?.isCustomer && (
                                    <>
                                        <div className="col-sm-6">
                                            <TextField id="orderId" value={orderId} onChange={e => onChange(e)} placeholder="Nhập mã đặt đơn" label="Mã đặt đơn" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="shippingCode" value={shippingCode} onChange={e => onChange(e)} placeholder="Nhập mã vận đơn" label="Mã vận đơn" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="totalPrice" value={totalPrice} onChange={e => onChange(e)} placeholder="Nhập số tiền đơn hàng" label="Số tiền đơn hàng" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="reviewer" value={reviewer} onChange={e => onChange(e)} placeholder="Nhập tài khoản" label="Tải khoản" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="customer" value={customer} onChange={e => onChange(e)} placeholder="Nhập khách" label="Khách" margin="dense" fullWidth />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <UploadImages onChange={onImagesChange} />
                            </div>
                            <div className='col-md-6 col-sm-12'>
                                <UploadVideos width={150} height={150} onChange={onVideosChange} />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <TextField id="reviewContent" multiline minRows={3} value={reviewContent} onChange={e => onChange(e)} placeholder="Nhập nội dung review" label="Nội dung review" margin="dense" fullWidth />
                        </div>
                        {
                            !user?.isCustomer && (
                                <div className="col-xs-12">
                                    <TextField id="reasonNoReview" value={reasonNoReview} onChange={e => onChange(e)} multiline minRows={3} placeholder="Nhập lý do không review" label="Lý do không review" margin="dense" fullWidth />
                                </div>
                            )
                        }
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