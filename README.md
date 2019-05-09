# Rails 6를 영접하자.

`Stimulus`,  `Bootstrap`, `jQuery`, `Popper`, `Font-awesome`, `SweetAlert2`, `Toastr`



## 0. 준비작업

- 레일스 젬 6 버전을 설치한다.

    ```sh
    $ gem install rails --pre   # pre-release 버전을 설치할 때
    $ gem install rails -v 6.0.0.rc1    # 특정 버전을 설치할 때
    ```

- 레일스 프로젝트 **blog** 를 생성한다. 

    ```sh
    $ rails new blog --webpack=stimulus  # 디폴트 데이터베이스 sqlite3를 사용할 때
    $ rails new blog --webpack=stimulus -d postgresql       # postgresql을 사용할 때
    $ rails new blog --webpack=stimulus -d mysql            # mysql을 사용할 때
    ```

- 프로젝트 폴더로 이동

    ```sh
    $ cd blog
    ```

- 데이터베이스를 생성한다. 

    ```sh
    $ bin/rails db:create     
    ```

- tmux를 실행한 후 터미널 위도우를 두개로 분할하여 아래의 명령을 각각 실행한다. 

    ```sh
    $ tmux new -s blog_session
    $ bin/rails server           # 로컬 웹서버를 시작
    $ bin/webpack-dev-server     # 리소스 변경시 자동으로 브라우저를 갱신한다.
    ```

- 홈 페이지 생성하기

  - home 컨트롤러 index 액션 작성하기

    ```sh
    $ bin/rails g controller home index
    ```

  - 루트 라우트 지정하기
  
    ```rb
  	root to: 'home#index'
    ```

  

## 1. Bootstrap

- 패키지 추가

    ```sh
    $ yarn add bootstrap jquery popper.js
    ```

- **config/webpack/environment.js**

    ```js
    const { environment } = require('@rails/webpacker')
    const webpack = require("webpack")

    environment.plugins.append("Provide", new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default']
    }))

    module.exports = environment
    ```


- **app/javascript/stylesheets/application.scss**

    ```scss
    @import "~bootstrap/scss/bootstrap";
    ```

- **app/javascript/application.js**

    ```js
    import 'bootstrap'
    import '../stylesheets/application'

    document.addEventListener('turbolinks:load', () => {
      $('[data-toggle="tooltip"]').tooltip()
      $('[data-toggle="popover"]').popover()
    })
    ```
    
- 애플리케이션 레이아웃 파일의 **body** 태그 시작부분에 **navbar** 추가하고 `<%= yield %>`를 **`container`** 클래스로 감싸 준다.

    ```erb
    <body>
      <!-- 여기에 navbar 삽입 -->
      <div class='container'>
        <%= yield %>
      </div>
    </body>
    ```

    아래의 bootstrap **navbar** 코드를 붙여넣기 한다.

    ```erb
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    ```

    **navbar** 에 `fixed-top` 클래스를 추가하면 **body**의 상단 부분이 **navbar**에 가려 안보이게 된다. 이를 해결하기 위해서 **body** 태그의 `padding-top` 값을 `6rem` 으로 설정해 준다. **app/javascript/stylesheets** 폴더에 **styles.scss** 파일을 생성하기 아래의 내용을 붙여넣기 한다.

    ```css
    body {
      padding-top: 6rem;
    }
    ```

    **app/javascript/stylesheets/application.scss** 파일을 열고 방금 작성한 **styles.scss** 파일을 **import** 한다. 

    ```scss
    @import "~bootstrap/scss/bootstrap";
    @import "./styles.scss";
    ```

    

## 2. Font-awesome

- 패키지 추가

    ```sh
    $ yarn add @fortawesome/fontawesome-free-webfonts
    ```

- **app/javascript/stylesheets/application.scss**

    ```scss
    $fa-font-path: '~@fortawesome/fontawesome-free-webfonts/webfonts'; 
    @import '~@fortawesome/fontawesome-free-webfonts/scss/fontawesome';
    @import '~@fortawesome/fontawesome-free-webfonts/scss/fa-regular';
    @import '~@fortawesome/fontawesome-free-webfonts/scss/fa-solid';
    @import '~@fortawesome/fontawesome-free-webfonts/scss/fa-brands';
    ```

- 무료로 사용할 수 있는 아이콘 리스트 : <https://fontawesome.com/icons?d=gallery&m=free>

    ```html
    <table class="table table-bordered table-sm">
      <thead class='thead-dark'>
        <tr>
          <th>Style</th>
          <th>Icon Font</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Solid</td>
          <td><i class="fas fa-address-book"></i></td>
          <td>fas fa-adress-book</td>
        </tr>
        <tr>
          <td>Regular</td>
          <td><i class="far fa-address-book"></i></td>
          <td>far fa-address-book</td>
        </tr>
        <tr>
          <td>Brands</td>
          <td><i class="fab fa-fort-awesome"></i></td>
          <td>fab fa-fort-awesome</td>
        </tr>
        <tr>
          <td>Solid</td>
          <td><i class="fas fa-ambulance"></i></td>
          <td>fas fa-ambulance</td>
        </tr>
        <tr>
          <td>Regular</td>
          <td><i class="far fa-gem"></i></td>
          <td>far fa-gem</td>
        </tr>
        <tr>
          <td>Brands</td>
          <td><i class="fab fa-apple"></i></td>
          <td>fab fa-apple</td>
        </tr>
        <tr>
          <td>Solid</td>
          <td><i class="fas fa-arrows-alt"></i></td>
          <td>fas fa-arrows-alt</td>
        </tr>
        <tr>
          <td>Regular</td>
          <td><i class="far fa-trash-alt"></i></td>
          <td>far fa-trash-alt</td>
        </tr>
        <tr>
          <td>Brands</td>
          <td><i class="fab fa-chrome"></i></td>
          <td>fab fa-chrome</td>
        </tr>
      </tbody>
    </table>
    ```

    

## 3. SweetAlert2

- Post 리소스를 scaffolding 한다.

    ```sh
    $ bin/rails g scaffold Post title content:text
    $ bin/rails db:migrate
    ```

- 패키지 추가

    ```sh
    $ yarn add sweetalert2
    ```

- **app/javascript/controller/confirm_controller.js**

    ```js
    import { Controller } from 'stimulus'
    import Swal from 'sweetalert2'

    export default class extends Controller {
      dialog(event) {
        event.preventDefault();
        let originLink = event.target.href
        let target_id_attr = event.target.closest('tr').id

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            let promise = $.ajax({
              type: 'DELETE',
              url: originLink + '.json'
            })  

            promise.fail(cancelFunc)
            promise.done(confirmFunc)

            function confirmFunc(){
              $(`#${target_id_attr}`).slideUp(1000)
              Swal.fire("Successfully deleted.")
            }
            function cancelFunc(){
              Swal.fire("Error occurred.")
            }
          }
        })
      }
    }
    ```

- **app/views/posts/index.html.erb**

    ```erb
    <tr id='post-<%= post.id %>'>
      ...
      <td data-controller='confirm'>
        <%= link_to 'Destroy', post, data: { action: "click->confirm#dialog" } %>
      </td>
    </tr>  
    ```
    
- app/views/posts/_form.html.erb 파일을 열고 아래와 같이 bootstrap 용 클래스를 적용한다.

    ```erb
    <%= form_with(model: post, local: true) do |form| %>
      <% if post.errors.any? %>
        <div id="error_explanation">
          <h2><%= pluralize(post.errors.count, "error") %> prohibited this post from being saved:</h2>
    
          <ul>
            <% post.errors.full_messages.each do |message| %>
              <li><%= message %></li>
            <% end %>
          </ul>
        </div>
      <% end %>
    
      <div class="field">
        <%= form.label :title %>
        <%= form.text_field :title, class: 'form-control' %>
      </div>
    
      <div class="field">
        <%= form.label :content %>
        <%= form.text_area :content, class: 'form-control' %>
      </div>
    
      <div class="actions">
        <%= form.submit class: 'btn bnt-primary' %>
      </div>
    <% end %>
    ```

    16, 21, 25 라인을 위와 같이 업데이트한다. 

- app/views/posts/index.html.erb 파일을 열고 table 태그(5행)와 하단(31행)의 "New Post" 링크에 클래스를 추가한다.

    ```erb
    <table class="table table-bordered">
    ····
    <%= link_to 'New Post', new_post_path, class: 'btn btn-primary' %>  
    ```

    

## 4. Toastr.js 

- 패키지 추가

    ```sh
    $ yarn add toastr
    ```

- 전용 컨트롤러 생성하기

    **app/javascript/controller/flash_controller.js**

    ```js
    import { Controller } from 'stimulus';
    import toastr from 'toastr';

    export default class extends Controller {
      static targets = []

      connect(){
        let messages = this.data.get("messages")
        if(messages) {
          console.log(messages)
          toastr.success(messages)
        }
      }
    }
    ```

- 스타일시트 추가하기

    **app/javascript/stylesheets/applictation.scss**

    ```scss
    @import "~toastr/toastr.scss";
    ```

- HTML 코드작성

    **app/views/layouts/application.html.erb** 
레이아웃 파일의 **body** 태그 내의 최상단에 아래의 코드를 붙여 넣는다. 
    
    ```erb
    <div data-controller='flash' 
         data-flash-messages='<%= flash[:notice] || notice %>'></div>
    ```


## 5. Summernote

- 패키지 설치

  > **주의**: **summernote** 패키지를 추가할 때 **codemirror** 패키지도 함께 추가해 준다.

  ```sh
  $ yarn add summernote codemirror
  ```

- 이미지를 업로드하여 처리할 때 필요한 젬을 설치
  Gemfile을 열고 아래와 같이 젬을 추가한다. 

  ```ruby
  gem 'image_processing', '~> 1.2'
  ```
  
  번들 인스톨 명령을 실행한다.
  
  ```sh
  $ bundle install
  ```
  
- 전용컨트롤러의 생성
  **app/javascript/controllers/summernote_controller.js**

  ```js
  import { Controller } from 'stimulus'
  
  // summernote용 자바스크립트 (Bootstrap 4 버전용)
  require('summernote/dist/summernote-bs4.js');
  // summernote용 스타일시트 (Boostrap 4 버전용)
  require('summernote/dist/summernote-bs4.css');
  // summernote용 한국어 로케일
  require('summernote/dist/lang/summernote-ko-KR.min.js');
  // codemirror용 자바스크립트
  require('codemirror/lib/codemirror.js');
  // codemirror용 스타일시트
  require('codemirror/lib/codemirror.css');
  // codemirror용 language 모드를 xml로 지정
  require('codemirror/mode/xml/xml.js');
  // codemirror에서 사용하는 테마 스타일시트(monokai)
  require('codemirror/theme/monokai.css');
  
  export default class extends Controller {
    static targets = []
  
    initialize(){
      // summernote 에디터에서 이모지를 입력할 수 있도록 한번만 ajax 호출
      $.ajax({
        url: 'https://api.github.com/emojis'
      }).then(function(data) {
        window.emojis = Object.keys(data);
        window.emojiUrls = data; 
      })     
    }
  
    connect(){
      console.log("summernote connected.")
      $('[data-editor="summernote"]').summernote({
        height: 300,
        focus: true,
        lang: 'ko-KR',
        prettifyHtml: true,
        placeholder: 'type starting with : and any alphabet',
        hint: {
          match: /:([\-+\w]+)$/,
          search: function (keyword, callback) {
            callback($.grep(emojis, function (item) {
              return item.indexOf(keyword)  === 0;
            }));
          },
          template: function (item) {
            var content = emojiUrls[item];
            return '<img src="' + content + '" width="20" /> :' + item + ':';
          },
          content: function (item) {
            var url = emojiUrls[item];
            if (url) {
              return $('<img />').attr('src', url).css('width', 20)[0];
            }
            return '';
        }
        },      
        codemirror: { 
          theme: 'monokai',
          mode: "text/html",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          tabMode: 'indent'
        },
        callbacks: {
          onImageUpload: function(files){
            console.log('called onImageUpload.')
            sendFile(files[0], $(this))
          },
          onMediaDelete: function(target, editor, editiable){
            console.log("called onMediaDelete.")
            let upload_id = target[0].id
            if(!!upload_id){
              deleteFile(upload_id)
            }
            target.remove()
          }
        }
      })
  
      function sendFile(file, toSummernote){
        console.log('called sendFile().')
        let data = new FormData()
        data.append('upload[image]', file)
        $.ajax({
          data: data,
          type: 'POST',
          url: '/uploads.json',
          cache: false,
          contentType: false,
          processData: false,
          success: function(data){
            console.log("image url: ", data.url)
            console.log('successfully created.')
            let img = document.createElement("IMG")
            img.src = data.url
            img.setAttribute('id', data.upload_id)
            toSummernote.summernote("insertNode", img)
          }
        })
      }
  
      function deleteFile(file_id){
        $.ajax({
          type: 'DELETE',
          url: `/uploads/${file_id}`,
          cache: false,
          contentType: false,
          processData: false
        })
      }
    }
  }
  ```
  
- 폼 뷰 파일의 옵션 추가

  ```erb
  ···
  <div data-controller="summernote" class="field">
    <%= form.label :content %>
    <%= form.text_area :content, data: { editor: 'summernote' } %>
  </div>
  ···
  ```

- **show** 뷰 파일의 옵션 추가

  ```erb
  ···
  <p>
    <strong>Content:</strong>
    <%= @post.content.html_safe %>
  </p>
  ···
  ```

- **codemirror** 에 대한 사용설명
  https://summernote.org/examples/#codemirror-as-codeview

- 이미지 파일 업로드를 위한 모델 생성

  ```sh
  $ bin/rails g model Upload
  ```

- **Upload** 모델 클래스 파일에서 처부할 항목명 지정

  ```ruby
  class Upload < ApplicationRecord
    has_one_attached :image
  end
  ```

- 이미지 업로드에 필요한 **active_storage**를 사용하기 위해 관련 마이그레이션 작업을 생성함

  ```sh
  $ bin/rails active_storage:install
  ```

  이어서 생성된 마이그레이션 파일에 대해서 db:migraqte 레일스 명령을 실행함.

  ```sh
  $ bin/rails db:migrate
  ```

- 업로드할 이미지를 처리할 컨트롤러 생성

  ```sh
  $ bin/rails g controller uploads create destroy
  ```

  **app/controllers/uploads_controller.rb** 파일을 열고 아래와 같이 추가해 준다. 

  ```ruby
  class UploadsController < ApplicationController
    def create
      @upload = Upload.new(upload_params)
      @upload.save
  
      respond_to do |format|
        format.json { render json: { url: rails_blob_url(@upload.image), upload_id: @upload.id } }
      end
    end
  
    def destroy
      @upload = Upload.find(params[:id])
      @upload.destroy
  
      respond_to do |format|
        format.json { render json: { status: :ok } }
      end
    end
  
    private
  
    def upload_params
      params.require(:upload).permit(:image)
    end
  end
  ```

  (참고동영상) [Episode #027 - WYSIWYG Editor with Summernote](https://youtu.be/A3vDRdfEyKs)

- 라우트 파일을 열고 아래와 같이 업데이트 한다.

  ```ruby
  Rails.application.routes.draw do
    root to: 'home#index'
    resources :posts
    resources :uploads, only: [:create, :destroy]
  end
  ```

  생성되는 라우트를 확인하기 위해 아래와 같은 명령을 실행해 본다.

  ```sh
  $ bin/rails routes -c=uploads
  ```

  > 노트 : `-c` 옵션은 특정 컨트롤러의 라우트만 보기 위한 것이다.