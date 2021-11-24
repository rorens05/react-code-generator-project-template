import React, {useState} from 'react'
import {InputGroup, FormControl, Button, Modal,Table, ProgressBar } from 'react-bootstrap';

function FileHeader() {
		const [smShow, setSmShow] = useState(false);
		const [lgShow, setLgShow] = useState(false);
		return (
			<div>
				<div className="row m-b-20">
					<div className="col-md-10 pages-header file-content"><h1>Files<i class="fas fa-folder-plus file-upload-content td-file-page"></i></h1>
							<h1 className="file-upload-content"><Button size="sm" variant="outline-warning"><i class="fas fa-folder file-upload-content "></i> New Folder</Button></h1> <h5 className="fileupload"> OR </h5>
							<h1 className="file-upload-content"><Button className="file-upload-content" size='sm' variant="outline-warning" onClick={() => setLgShow(true)}> +Upload File</Button></h1>
					</div>
				</div>
						<Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
							<Modal.Header closeButton>
								<Modal.Title id="example-modal-sizes-title-lg">
									Upload File
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
											<div style={{ paddingBottom:'45px', paddingTop:'25px'}}><Button size='lg' variant="outline-warning" className="file-library"><i class="fas fa-paperclip"></i> Choose Files</Button></div>
									<Table responsive="sm">
										<thead>
											<tr>
												<th>File Name</th>
												<th>Progress</th>
												<th>Size</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Exam1_Delacruz.docx</td>
												<td><ProgressBar variant="warning" now={100} /></td>
												<td>317.56 KB <i class="fas fa-times td-file-page"></i></td>
											</tr>
											<tr>
												<td>Exam1_Delacruz.docx</td>
												<td><ProgressBar variant="warning" now={100} /></td>
												<td>317.56 KB <i class="fas fa-times td-file-page"></i></td>
											</tr>
										</tbody>
									</Table>
										<Button size="lg" variant="outline-warning" className="file-library file-button-upload">Upload</Button>
							</Modal.Body>
						</Modal>
		</div>
	)
}
export default FileHeader

