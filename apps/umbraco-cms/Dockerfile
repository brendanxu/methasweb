# Use the official ASP.NET Core runtime as base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files
COPY ["src/Umbraco.Web.UI/Umbraco.Web.UI.csproj", "src/Umbraco.Web.UI/"]
COPY ["Directory.Build.props", "."]
COPY ["Directory.Packages.props", "."]
COPY ["global.json", "."]

# Restore dependencies
RUN dotnet restore "src/Umbraco.Web.UI/Umbraco.Web.UI.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/src/Umbraco.Web.UI"
RUN dotnet build "Umbraco.Web.UI.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "Umbraco.Web.UI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage/image
FROM base AS final
WORKDIR /app

# Create necessary directories
RUN mkdir -p /app/App_Data /app/wwwroot/media /app/umbraco/Logs

# Copy published files
COPY --from=publish /app/publish .

# Set permissions for SQLite database directory
RUN chmod 755 /app/App_Data

# Environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV Umbraco__CMS__Global__SuppressHostnameRedirect=true
ENV Umbraco__CMS__DeliveryApi__Enabled=true
ENV Umbraco__CMS__DeliveryApi__PublicAccess=true

ENTRYPOINT ["dotnet", "Umbraco.Web.UI.dll"]