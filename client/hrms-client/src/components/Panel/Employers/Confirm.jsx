import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import EmployerService from "../../../services/EmployerService"

const Delete = ({ open, setOpen,select,setData,setfilteredData }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const handleClose = () => {
            setOpen(false);
      };

      const Onayla= async()=>{
            if(!select.actived){
                  const res = await EmployerService.confirmEmail(select.id)
                  if(res.success){
                        setData(prevValue=>prevValue.map(item=>{
                              if(item.id === select.id){
                                    return {...item,actived:true,updated:true}
                              }
                              else{
                                    return item
                              }
                        }))
                        setfilteredData(prevValue=>prevValue.map(item=>{
                              if(item.id === select.id){
                                    return {...item,actived:true,updated:true}
                              }
                              else{
                                    return item
                              }
                        }))
                  }
                  setOpen(false)
            }
            else if(!select.updated){
                  const res = await EmployerService.updateEmployerUpdated(select.id,true)
                  if(res.success){
                        setData(prevValue=>prevValue.map(item=>{
                              if(item.id === select.id){
                                    return {...res.data}
                              }
                              else{
                                    return item
                              }
                        }))
                        setfilteredData(prevValue=>prevValue.map(item=>{
                              if(item.id === select.id){
                                    return {...res.data}
                              }
                              else{
                                    return item
                              }
                        }))
                  }
                  setOpen(false)
            }
      }

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{!select.actived ? "Aktiflik De??i??tir":"G??ncellik De??i??tir"}</DialogTitle>
                  <DialogContent>
                        <h3>???? ??smi: {select.companyName}</h3>
                        <h5>Aktif: {select.actived ? "Aktif" : "Aktif De??il"}</h5>
                        <h5>G??ncel: {select.updated ? "G??ncel" : "G??ncel De??il"}</h5>
                  </DialogContent>
                  <DialogActions>
                        <Button onClick={handleClose} color="primary">
                              ????k????
                        </Button>
                        <Button onClick={Onayla} color="primary" autoFocus>
                              Onayla
                        </Button>
                  </DialogActions>
                  
            </Dialog>
      );
}

export default React.memo(Delete)