# Facebook Login Component

## Parameters

|    params    |   value  |  Required  | Description |
|:------------:|:--------:|:----------:|:-----------:|
|     appId    | string   |    Yes     | Facebook application id |
|  onResponse  | function |    Yes     | Callback function |
|  renderProps | function |    Yes     | Props to render |
|  isLoggedIn  | function |    Yes     | Set TRUE if a user is connected |
|onLoadComplete| function |    No      | Set TRUE if the SDK and Fb.Init are loaded |
|    version   | string   |    No      | Graph api version ('v3.1') |
|    cookie    | boolean  |    No      | Cookie |
|   language   | string   |    No      | Sdk language ('en_US') |
|    fields    | string   |    No      | Fields to get in response |
|    scope     | string   |    No      | Permissions |
|  autoLogin   | boolean  |    No      | Is the value is True the login will be automatically |
|    xfbml     | boolean  |    No      | With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML |
