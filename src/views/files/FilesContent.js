import React from 'react'
import {Table, Button} from 'react-bootstrap'
import moment from 'moment';

function FilesContent(props) {


  const  downloadImage = (url) => {
    fetch(url, {
      mode : 'no-cors',
    })
      .then(response => response.blob())
      .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.download = url.replace(/^.*[\\\/]/, '');
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }


  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Name <i class="fas fa-sort-alpha-down td-file-page"></i></th>
          <th>Date Modified <i class="fas fa-sort-numeric-down td-file-page"></i></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr colSpan={4} className={props.data.length == 0 ? 'text-center p-3' : 'd-none'}>
          <td colSpan={3}>
            No items to display
          </td>
        </tr>
        {
          props.data?.map((item, index) => {
            return(
              <tr key={item.fileName+index}>
                <td className='ellipsis w-25'>{item.fileName}</td>
                {
                  props.type == 'Class' ? <td>{item.classFiles ? moment(item.classFiles?.createdDate).format('L') : moment(item.courseFiles?.createdDate).format('L')}</td> 
                    :
                  <td>{moment(item.createdDate).format('L')}</td>
                }
                <td>
                  {/* {
                    item.path_Base.match(/.(jpg|jpeg|png|gif|pdf)$/i)
                    ?
                    <i class="fas fa-arrow-down td-file-page" onClick={() => downloadImage(item.path_Base)}></i>
                    : */}
                    <a href={item.path_Base} download={true} target='_blank'>
                      <i class="fas fa-arrow-down td-file-page"></i>
                    </a> 
                  {/* } */}
                  <i class="fas fa-trash-alt td-file-page"></i></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
export default FilesContent
