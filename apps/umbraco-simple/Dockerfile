# Use the official .NET SDK image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["SouthPoleUmbracoSimple.csproj", "."]
RUN dotnet restore "./SouthPoleUmbracoSimple.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "SouthPoleUmbracoSimple.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SouthPoleUmbracoSimple.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Set environment variables
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "SouthPoleUmbracoSimple.dll"]