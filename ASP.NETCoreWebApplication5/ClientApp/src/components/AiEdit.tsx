import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'

interface DataTableProps<T> {
  data: T[]
  columns: Array<Column<T>>
  onSave: (data: T) => void

  onNew: () => T

  onDelete: (data: T | null) => void
}

interface Column<T> {

  readonly?: boolean

  colspan: number
  key: keyof T
  label: string
}

export function AiTable<T extends object> ({
  data,
  columns,
  onSave,
  onNew,
  onDelete,
}: DataTableProps<T>) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
	const [editedData, setEditedData] = React.useState<T | null>(null)
	const [deleteData, setDeleteData] = React.useState<T | null>(null)
	const handleSaveClick = async () => {
    if (editedData != null) {
      try {
        await onSave(editedData)
				setEditDialogOpen(false)
				setEditedData(null)
			} catch (e) {
      }
    }
  };

  const handleCancelClick = () => {
    setEditDialogOpen(false)
		setEditedData(null)
	};

  const handleFieldChange = (key: keyof T, value: any) => {
    if (editedData != null) {
      setEditedData((prevData: any) => ({
        ...prevData,
        [key]: value
			}))
		}
  };

  const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	const handleEditClick = (row: T) => {
    setEditedData(row)
		setEditDialogOpen(true)
	};

  interface Props {
    open: boolean
    handleClose: () => void
    handleConfirm: () => void
  }

  const ConfirmDialog: React.FC<Props> = ({ open, handleClose, handleConfirm }) => {
    	return (
    		<Dialog fullWidth={true} fullScreen={fullScreen} open={open} onClose={handleClose}>
    			<DialogTitle>Delete Item</DialogTitle>
    			<DialogContent>Confermi l'eliminazione?</DialogContent>
    			<DialogActions>
    				<Button onClick={handleClose}>Cancel</Button>
    				<Button onClick={handleConfirm} variant="contained" color="error">
                        Delete
    				</Button>
    			</DialogActions>
    		</Dialog>
    	)
  }

  return (
    	<React.Fragment>
    		<ConfirmDialog open={deleteData != null}
    			handleConfirm={async () => {
    				await onDelete(deleteData)
  				setDeleteData(null)
  			}}
    			handleClose={() => {
    				setDeleteData(null)
  			}}/>
    		<TableContainer component={Paper} id={'admin'}>
    			<Table style={{ tableLayout: 'fixed' }}>
    				<TableHead>
    					<TableRow>
    						{columns.map((col: any) => (
    							<TableCell colSpan={col.colspan} key={col.key}>{col.label}</TableCell>
    						))}
    						<TableCell colSpan={1} sx={{ textAlign: 'right' }}>
    							<IconButton onClick={() => { handleEditClick(onNew()) }}>
    								<Add/>
    							</IconButton>
    						</TableCell>
    					</TableRow>
    				</TableHead>
    				<TableBody>
    					{data.map((row: any) => (
    						<TableRow key={JSON.stringify(row)}>
    							{columns.map((col: any) => (
    								<TableCell colSpan={col.colspan} sx={{
    									overflow: 'hidden',
    									textOverflow: 'ellipsis',
    									whiteSpace: 'nowrap'
    								}} key={col.key}>
    									{row[col.key]}
    								</TableCell>
    							))}
    							<TableCell colSpan={1} sx={{ textAlign: 'right' }}>
    								<IconButton onClick={() => { handleEditClick(row) }}>
    									<Edit/>
    								</IconButton>
    								<IconButton onClick={() => { setDeleteData(row) }}>
    									<Delete/>
    								</IconButton>
    							</TableCell>
    						</TableRow>
    					))}
    				</TableBody>
    			</Table>
    		</TableContainer>
    		<Dialog fullWidth={true} maxWidth={'md'} fullScreen={fullScreen} open={editDialogOpen}
    			onClose={handleCancelClick}>
    			<DialogTitle>Edit Row</DialogTitle>
    			<DialogContent>
    				<DialogContentText>
                        Please edit the fields below:
    				</DialogContentText>
    				{(editedData != null) &&
                        columns.map((col) => (
                        	<div key={col.key as string}>
                        		<TextField
                        			InputProps={{
                        				readOnly: col.readonly
                        			}}
                        			multiline={true}
                        			label={col.label}
                        			value={editedData[col.key] as any}
                        			onChange={(e) => { handleFieldChange(col.key, e.target.value) }
                        			}
                        			fullWidth
                        			margin="normal">
                        		</TextField>
                        	</div>
                        ))}
    			</DialogContent>
    			<DialogActions>
    				<Button onClick={handleCancelClick} color="secondary">
                        Cancel
    				</Button>
    				<Button onClick={handleSaveClick} color="primary">
                        Save
    				</Button>
    			</DialogActions>
    		</Dialog>
    	</React.Fragment>
  )
}
