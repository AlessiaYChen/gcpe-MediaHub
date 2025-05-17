using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gcpe_MediaHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MediaContacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPressGallery = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CallInPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SocialMediaURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Outlets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Requests = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastActive = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaContacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaOutlets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewsDeskPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MediaTypes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LanguageShortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMajorMedia = table.Column<bool>(type: "bit", nullable: false),
                    WebsiteURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SocialMediaXURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SocialMediaInstagramURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaOutlets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaRequests",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    RequestedBy = table.Column<int>(type: "int", nullable: false),
                    LeadMinistry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SharedWith = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Resolution = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactOutlets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    OutletId = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactOutlets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactOutlets_MediaContacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "MediaContacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactOutlets_MediaOutlets_OutletId",
                        column: x => x.OutletId,
                        principalTable: "MediaOutlets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactOutlets_ContactId",
                table: "ContactOutlets",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactOutlets_OutletId",
                table: "ContactOutlets",
                column: "OutletId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactOutlets");

            migrationBuilder.DropTable(
                name: "MediaRequests");

            migrationBuilder.DropTable(
                name: "MediaContacts");

            migrationBuilder.DropTable(
                name: "MediaOutlets");
        }
    }
}
