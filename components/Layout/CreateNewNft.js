import React from 'react'
import $ from "jquery";
export default function CreateNewNft() {
//   $(document).ready(function () {
//     window.$ = window.jQuery = require('jquery')
//     $('#wrapper').on('dragover',function(e){
//       e.preventDefault();
//     })
//     $('#img_preview').on('dragover',function(e){
//       e.preventDefault();
//       $('#img_upload').addclassName('on');
//       $('#img_upload').removeclassName('on');
//     })
//     $('#img_preview').on('drop',function(e){
//       dragoverHandler(e);
//     });
//     $('#img_upload').on('dragover',function(e){
//       e.preventDefault();
//       $('#img_upload').addclassName('on');
//     })
//     $('#img_upload').on('drop',function(e){
//       dragoverHandler(e);
//       $('#img_upload').removeclassName('on');
//     });
//   // function dragoverHandler(e) {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   e.originalEvent.dataTransfer.getData("image/*");
//   //    var files = e.originalEvent.dataTransfer.files;
//   //   $('#img_upload input[type="file"]').prop('files', files)
//   // }
//   function img_load(img){
    
//     if(img.files && img.files[0]){
//       console.log(img.files);
//       var reader = new FileReader();
//       reader.onload = function (event) {
//         $('#img_upload').css('background-image','url('+event.target.result+')');
//         $('#img_preview').css('background-image','url('+event.target.result+')');
//       }
//       reader.readAsDataURL(img.files[0]);
//     }
//   }
// });
  return (
    <>
    <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Company Name * (Legal name)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                    name="First Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Instrument *</label>
                                                <select className="form-control">
                                                    <option>Manager</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="form-group files color">
                                        <label>Upload file</label>
                                        <input type="file" className="form-control" multiple="" />
                                    </div>
                                    </div>
                                </div>
                                <div className="col">
                                     <div className="form-group files color">
                                     <label>Instrument *</label>
                                                <select className="form-control">
                                                    <option>Manager</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                    </div>
                                </div>

                            </div>

                            <div id="wrapper">
  <section>
    
    <label id="img_upload" className="imgprev">
      <input type="file" onchange="img_load(this);" accept="image/*"/><span></span>
    </label>
    <div id="img_preview"><img src="https://img.icons8.com/material-rounded/48/000000/upload-2.png"/></div>
  </section>
</div>
  <div className="container">
  <div className="title"><h1>Create New NFT</h1></div>
  <p className="title-below">Single edition on Ethereum</p>
  <form action="#">
    <div className="user__details">
      <div className="input__box">
        <span className="details">Choose wallet</span>
        <input type="text" placeholder="E.g: John Smith" required/>
      </div>
      <div className="input__box">
        <span className="details">Username</span>
        <input type="text" placeholder="johnWC98" required/>
      </div>
      <div className="input__box">
        <span className="details">Email</span>
        <input type="email" placeholder="johnsmith@hotmail.com" required/>
      </div>
      <div className="input__box">
        <span className="details">Phone Number</span>
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="012-345-6789" required/>
      </div>
      <div className="input__box">
        <span className="details">Password</span>
        <input type="password" placeholder="********" required/>
      </div>
      <div className="input__box">
        <span className="details">Confirm Password</span>
        <input type="password" placeholder="********" required/>
      </div>

    </div>
    
    <div className="button">
      <input type="submit" value="Register"/>
    </div>
  </form>
</div>
    
    </>
  )
}
