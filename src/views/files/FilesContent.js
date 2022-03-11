import React from 'react'
import {Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
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

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  )

  const renderTooltipView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View
    </Tooltip>
  )

  const renderTooltipDownload = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Download
    </Tooltip>
  )

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Name</th>  {/* icon for sorting <i class="fas fa-sort-alpha-down td-file-page"></i> */}
          <th >Date Modified</th>  {/* icon for sorting <i class="fas fa-sort-numeric-down td-file-page"></i> */}
          <th >Actions</th>
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
                <td className='ellipsis w-25' style={{color:'#EE9337', fontSize:'20px'}}>{item.fileName}</td>
                {
                  props.type == 'Class' ? <td className='ellipsis w-50' style={{fontSize:'20px'}}>{item.classFiles ? moment(item.classFiles?.createdDate).format('LL') : moment(item.courseFiles?.createdDate).format('LL')}</td> 
                    :
                  <td className='ellipsis w-25' style={{fontSize:'20px'}} >{moment(item.createdDate).format('LL')}</td>
                }
                <td style={{paddingRight:'15px'}} >
                  {/* {
                    item.path_Base.match(/.(jpg|jpeg|png|gif|pdf)$/i)
                    ?
                    <i class="fas fa-arrow-down td-file-page" onClick={() => downloadImage(item.path_Base)}></i>
                    : */}
                                      <OverlayTrigger
                    placement="right"
                    delay={{ show: 1500, hide: 0 }}
                    overlay={item.path_Base.match(/.(jpg|jpeg|png|gif|pdf)$/i) ? renderTooltipView : renderTooltipDownload }>
                    <a href={item.path_Base} download={true} target='_blank'>                     
                      <i class={`${item.path_Base.match(/.(jpg|jpeg|png|gif|pdf)$/i) ? 'fa-eye' : 'fa-arrow-down'} fas td-file-page`}></i>
                    </a> 
                    </OverlayTrigger>
                  {/* } */}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 1500, hide: 0 }}
                    overlay={renderTooltipDelete}>
                    <a  >
                    <i class="fas fa-trash-alt td-file-page"></i> </a>
                  </OverlayTrigger>
                  </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}
export default FilesContent
