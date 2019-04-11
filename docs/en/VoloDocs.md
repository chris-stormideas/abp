# VoloDocs 

## What is VoloDocs?

VoloDocs is a cross-platform web application that allows you to easily create beautiful documentation and build developer communities. It simplifies software documentation with the help of GitHub integration. You use the power of GitHub for versioning, hosting of your docs. You let your users to edit a document.

## Main Features

- Serves documents from your GitHub repository.
- Supports Markdown / HTML document formatting.
- Supports versioning (integrated to GitHub releases).
- Support multiple projects.
- Allows users to edit a document on GitHub.
- Cross-platform; deployable to Windows / Linux / macOS.

## GitHub Repository

It's free & open-source. You can browse VoloDocs source-code and contribute on GitHub:

https://github.com/abpframework/abp/tree/master/modules/docs

## Download

You can download the VoloDocs release from the following link:

http://apps.abp.io/VoloDocs/VoloDocs.zip

## Folder Structure

When you extract the VoloDocs.Release zip file, you see a `Web` folder and a `Migrator` folder. `Web` folder contains the website files and `Migrator` contains the application to build your database. Before publishing your website, you need to create a new database or update your existing database to the latest. If this is the first time you install VoloDocs, `Migrator` will create a new database for you, otherwise it updates to the latest version. The only setting you need to configure, is the `ConnectionString` which is located in the `appsettings.json` file. See the next section for how to configure your VoloDocs application.

## Steps by Step Deployment

- ### Database Migration

   To update your existing database or create your initial database, go to `Migrator` folder in your VoloDocs directory. 

   Open `appsettings.json` in your text editor and set your database connection string. If you don't know how to write the connection string for your database system, you can check out https://www.connectionstrings.com/.

   After you set your connection string, run `Migrate.bat` for Windows platform and `VoloDocs.Migrator` for other operating systems. That's it now configure your website.

- ### Configuring Website

   Go to `Web` folder in your VoloDocs directory. Open `appsettings.json` in your text editor. Set your connection string (same as in the `Migrator`'s  `appsettings.json`). Set `title` of your website. This will be written on the left-upper corner of your website. That's it! Now you can publish your website.

   If you want to run 

- ### Publishing Website

   In the previous step, you created or updated your database. Ensure that your database exists on the specified connection string. 

   - #### Publishing to IIS 

      - Move `Web`  folder to your `wwwroot ` folder.
      - Rename `Web` folder to `VoloDocs`  (Now you have `C:\inetpub\wwwroot\VoloDocs`).![Add IIS Website](images/volodocs-iis-add-website.png)
      - The `VoloDocs` application pool is being created automatically. Open **Application Pools**  and double click `VoloDocs` application pool and set 
        - **.NET CLR version**: `No Managed Code`
        - **Managed pipeline mode**: `Integrated`

      ![Add IIS Website](images/volodocs-iis-application-pool.png)

      

      - If you get the below error, it means don't have the hosting bundle installed on the server. See [this document](https://docs.microsoft.com/aspnet/core/host-and-deploy/iis/#install-the-net-core-hosting-bundle) to learn how to install it or [download Hosting Bundle](https://www.microsoft.com/net/permalink/dotnetcore-current-windows-runtime-bundle-installer) and run on your server.

        ```
        Handler "aspNetCore" has a bad module "AspNetCoreModuleV2" in its module list using IIS       
        ```

      - Further information about hosting VoloDocs check out [Microsoft's official document for hosting ASP.NET Core application on IIS](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis).

   - #### Publishing to Azure

      Microsoft has a good document on how to deploy your ASP.NET Core web app to Azure App Service. We recommend you to read this document https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-dotnet.

    - #### Running the Application From Command Line 

      Alternatively you can run the application from command line, navigate to `VoloDocs\Web` folder and run the below command in your command line for Windows:

      ```powershell
      dotnet VoloDocs.Web.dll
      ```

- ### First Run

   To start the website, navigate to your address (as configured in the previous section).

   When you first open the website, you need to create a project.

   #### Creating a Project

   Go to the following address to create project

   - `http://<yourwebsite>/Account/Login?returnUrl=/Docs/Admin/Projects`

   ##### Default credentials

   To login the admin side, use the following credentials:

   * **Username**: `admin`

   * **Password**: `1q2w3E*`

   ##### An example project definition

   Here's a sample project information that uses GitHub source.

   We will configure the VoloDocs to show ABP Framework's documentation that's stored in GitHub.

   Here's the link to ABP Framework GitHub docs folder:

   https://github.com/abpframework/abp/tree/master/docs/en

   

   * **Name**: `ABP Framework`

   * **Short name**: `abp`

   * **Format**: `markdown`

   * **Default document name**: `Index`

   * **Navigation document name**: `docs-nav.json`

   * **Minimum version**: <empty>

   * **Main web site URL**: `/`

   * **Latest version branch name**: <empty>

   * **GitHub root URL**: `https://github.com/abpframework/abp/tree/{version}/docs/en/`

   * **GitHub access token**: <retrieve from GitHub>

   * **GitHub user agent**: <your username>

     

   After you save the project, go to root website address and you will see your documentation.

   * `http://<yourwebsite>/documents`



