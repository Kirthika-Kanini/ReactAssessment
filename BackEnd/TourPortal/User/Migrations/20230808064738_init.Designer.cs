﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using User.Data;

#nullable disable

namespace User.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20230808064738_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("User.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("User.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<string>("Restaurant")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("billingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("billingMail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("daysCount")
                        .HasColumnType("int");

                    b.Property<string>("endDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("endTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("endingPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("headCount")
                        .HasColumnType("int");

                    b.Property<string>("hotel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startingPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userMail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("usersId")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("usersId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("User.Models.Feedback", b =>
                {
                    b.Property<int>("feedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("feedbackId"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<string>("createdAt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("feedback")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("userId")
                        .HasColumnType("int");

                    b.HasKey("feedbackId");

                    b.HasIndex("BookingId");

                    b.HasIndex("userId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("User.Models.UserDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Phone")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Id");

                    b.ToTable("UserDetails");
                });

            modelBuilder.Entity("User.Models.Booking", b =>
                {
                    b.HasOne("User.Models.UserDetail", "users")
                        .WithMany("Bookings")
                        .HasForeignKey("usersId");

                    b.Navigation("users");
                });

            modelBuilder.Entity("User.Models.Feedback", b =>
                {
                    b.HasOne("User.Models.Booking", "booking")
                        .WithMany("Feedbacks")
                        .HasForeignKey("BookingId");

                    b.HasOne("User.Models.UserDetail", "user")
                        .WithMany("Feedbacks")
                        .HasForeignKey("userId");

                    b.Navigation("booking");

                    b.Navigation("user");
                });

            modelBuilder.Entity("User.Models.Booking", b =>
                {
                    b.Navigation("Feedbacks");
                });

            modelBuilder.Entity("User.Models.UserDetail", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Feedbacks");
                });
#pragma warning restore 612, 618
        }
    }
}
