import React from 'react'
import {Table, Button} from 'react-bootstrap'
import FileHeader from './FileHeader'
import CoursesAPI from "../../api/CoursesAPI";

function FilesContent() {
  return (
    <div className="row m-b-20 col-md-8 file-content">
			<FileHeader />
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
          <td colSpan={4} className='text-center p-3'>
            No items to display
          </td>
    			{/* <tbody>
      			<tr>
        			<td>Exam1_Delacruz.docx</td>
        			<td>317.56 KB</td>
							<td>11/8/2021</td>
							<td><i class="fas fa-edit td-file-page"></i>
        				<i class="fas fa-arrow-down td-file-page"></i>
								<i class="fas fa-trash-alt td-file-page"></i></td>
      			</tr>
      			<tr>
							<td>Exam1_Delacruz.docx</td>
							<td>317.56 KB</td>
							<td>11/8/2021</td>
							<td><i class="fas fa-edit td-file-page"></i>
							<i class="fas fa-arrow-down td-file-page"></i>
							<i class="fas fa-trash-alt td-file-page"></i></td>
     			 	</tr>
    			</tbody> */}
  			</Table>
			</div>
		</div>
  )
}
export default FilesContent
