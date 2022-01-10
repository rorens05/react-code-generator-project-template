import React from 'react'
import {Table, Button} from 'react-bootstrap'
import FileHeader from './FileHeader'

function FilesContent(props) {
  console.log(props.data)
  return (
    <div className="row m-b-20 file-content">
			<FileHeader type={props.type} id={props.id}/>
			<div className="row m-b-20">
				<Table responsive="sm">
    			<thead>
      			<tr>
        			<th>Name <i class="fas fa-sort-alpha-down td-file-page"></i></th>
        			<th>Size <i class="fas fa-sort-numeric-down td-file-page"></i></th>
							<th>Date Modified <i class="fas fa-sort-numeric-down td-file-page"></i></th>
        			<th>Actions</th>
      			</tr>
    			</thead>
          <td colSpan={4} className={props.data.length == 0 ? 'text-center p-3' : 'd-none'}>
            No items to display
          </td>
    			<tbody>
            {
              props.data?.map((item, index) => {
                return(
                  <tr>
                    <td className='ellipsis'>{item.fileName}</td>
                    <td>317.56 KB</td>
                    {
                      props.type == 'Class' ? <td>{item.classFiles ? item.classFiles?.createdDate : item.courseFiles?.createdDate}</td> 
                        :
                      <td>{item.createdDate}</td>
                    }
                    <td><i class="fas fa-edit td-file-page"></i>
                      <i class="fas fa-arrow-down td-file-page"></i>
                      <i class="fas fa-trash-alt td-file-page"></i></td>
                  </tr>
                )
              })
            }
    			</tbody>
  			</Table>
			</div>
		</div>
  )
}
export default FilesContent
