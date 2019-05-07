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
    
    


## 5. Tui-Editor 

- 패키지 설치

  ```sh
  $ yarn add tui-editor
  ```

- 에디터전용 컨트롤러의 작성
  **app/javascript/controllers/tui_editor_controller.js**

  ```js
  import { Controller } from 'stimulus'
  
  // import 'tui-editor';
  import "tui-editor/dist/tui-editor-Editor-all"
  import 'tui-chart';
  import 'raphael';
  import 'plantuml-encoder';
  import 'tui-color-picker';
  import 'tui-code-snippet';
  
  // deps for editor
  require('codemirror/lib/codemirror.css'); // codemirror
  require('tui-editor/dist/tui-editor.css'); // editor ui
  require('tui-editor/dist/tui-editor-contents.css'); // editor content
  require('highlight.js/styles/github.css'); // code block highlight
  require('tui-color-picker/dist/tui-color-picker.css');
  require('tui-chart/dist/tui-chart.css');
  
  export default class extends Controller {
    static targets = [ 'content' ]
  
  	connect(){
      console.log("tuiEditor connected!")
      $("[data-editor='tui-editor']").hide().after("<div id='editSection'></div>")
      $("#editSection").tuiEditor({
        initialEditType: 'markdown',
        initialValue: this.contentTarget.value,
        previewStyle: 'vertical',
        height: '500px',
        exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table']
      })
    }
  
    submit(event){
      console.log('submitted....')
      this.contentTarget.textContent =$("#editSection").tuiEditor('getValue')
    }
  }
  ```

- 폼 템플릿의 설정
  **app/views/posts/_form.html.erb**

  ```erb
  <%= form_with(model: post, local: true, data: {controller: 'tui-editor', action: 'submit->tui-editor#submit'}) do |form| %>
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
      <%= form.text_area :content, data: { editor: 'tui-editor', target: 'tui-editor.content' } %>
    </div>
  
    <div class="actions">
      <%= form.submit class: 'btn btn-primary' %>
    </div>
  <% end %>
  ```

- 뷰어전용 컨트롤러의 작성
  **app/javascript/controllers/tui_viewer_controller.js**

  ```js
  import { Controller } from 'stimulus'
  
  export default class extends Controller {
    static targets = []
  
    connect(){
      console.log("tuiViewer connected!")
      $("[data-viewer='tui-viewer']").hide().after("<div id='viewSection'></div>")
      $("#viewSection").tuiEditor({
        initialValue: $("[data-viewer='tui-viewer']").text(),
        height: '500px',
        viewer: true
      })
    }
  }
  ```

- 뷰 템플릿의 설정
  **app/views/posts/show.html.erb**

  ```erb
  <p>
    <strong>Title:</strong>
    <h1><%= @post.title %></h1>
    <hr>
  </p>
  
  <div data-controller='tui-viewer'>
    <div data-viewer='tui-viewer'>
      <%= @post.content %>
    </div>
  </div>
  
  <%= link_to 'Edit', edit_post_path(@post) %> |
  <%= link_to 'Back', posts_path %>
  ```
  