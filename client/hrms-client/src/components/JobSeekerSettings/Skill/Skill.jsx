import React, { useState,useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';

//Services
import JobSeekerService from "../../../services/JobSeekerService"

//Components
import Add from "./Add"
import Edit from "./Edit"
import Delete from "./Delete"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Skill = ()=>{
      const classes = useStyles();
      const isLogged = useSelector(state=> state.loggedReducer)

      const [add,setAdd] = useState(false)
      const [edit,setEdit] = useState(false)
      const [del,setDel] = useState(false)

      const [skill,setSkill] = useState({
            id:0,
            name: ''
      })

      const [data,setData] = useState([])

      const init = async () => {
            const res = await JobSeekerService.getSkillsByUserId(isLogged.id)
            if(res){
                  setData(res)
            }  
      }

      useEffect(()=>{
            init()
      },[])

      return(<div>
            <ToastContainer/>
            <button className="btn-green float-right" onClick={()=>{setAdd(true)}}>Ekle</button>
            <div className="py-4"></div>
            <div className="p-1">
                  <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                              <TableCell><b>Beceri</b></TableCell>
                              <TableCell align="right"><b>İşlemler</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                              {data.map((row) => (
                                    <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                          <Button variant="contained" color="primary" className="mb-1" onClick={()=>{
                                                setSkill(row)
                                                setTimeout(()=>{setEdit(true)},500)
                                          }}>
                                          Düzenle
                                          </Button>
                                          <Button variant="contained" color="secondary" onClick={()=>{
                                                setSkill(row)
                                                setTimeout(()=>{setDel(true)},500)
                                          }}>
                                          Sil
                                          </Button>
                                    </TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                        </Table>
                  </TableContainer>
            </div>
            <Add open={add} setOpen={setAdd} init={init} toast={toast}/>
            <Edit open={edit} setOpen={setEdit} skill={skill} init={init} toast={toast}/>
            <Delete open={del} setOpen={setDel} skill={skill} init={init} toast={toast} />
      </div>)
}

export default Skill